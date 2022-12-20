import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import Register from "../Register/Register";
import Login from "../Login/Login";

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
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route
          path="sign-up"
          element={
            <AuthPage
              title={"Добро пожаловать!"}
              caption={registerCaption}>
                <Register/>
            </AuthPage>}
        />
        <Route
          path="sign-in"
          element={
            <AuthPage
              title={"Рады видеть!"}
              caption={loginCaption}>
              <Login/>
            </AuthPage>}
        />
      </Routes>
    </div>
  );
}

export default App;
