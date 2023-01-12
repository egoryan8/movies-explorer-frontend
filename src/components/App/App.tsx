import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import React, {useState} from "react";
import AuthPage from "../AuthPage/AuthPage";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {getUser, login, LoginData, register, RegisterData} from "../../utils/api";
import {CurrentUserContext} from "../../contexts/currentUserContext";

const registerCaption = {
  text: "Уже зарегистрированы?",
  linkText: "Войти",
  path: "/sign-in",
};

const loginCaption = {
  text: "Ещё не зарегистрированы?",
  linkText: "Регистрация",
  path: "/sign-up"
};

function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});

  const handleRegister = async (data: RegisterData) => {
    try {
      const user = await register(data);
      setCurrentUser(user);
      setIsLogged(true);
      navigate('/sign-in')
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogin = async (data: LoginData) => {
    try {
      const {token} = await login(data);
      localStorage.setItem('token', token);
      const user = await getUser(token);
      setCurrentUser(user);
      setIsLogged(true);
      navigate('/movies');
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('token');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route
            path="/movies"
            element={
              <ProtectedRoute Component={Movies} isLogged={isLogged}/>
            }/>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute Component={SavedMovies} isLogged={isLogged}/>
            }/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute Component={Profile} isLogged={isLogged} logout={handleLogout}/>
            }/>
          <Route
            path="sign-up"
            element={
              <AuthPage
                title={"Добро пожаловать!"}
                caption={registerCaption}>
                <Register handler={handleRegister}/>
              </AuthPage>}
          />
          <Route
            path="sign-in"
            element={
              <AuthPage
                title={"Рады видеть!"}
                caption={loginCaption}>
                <Login handler={handleLogin}/>
              </AuthPage>}
          />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
