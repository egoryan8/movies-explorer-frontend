import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import Register from "../Register/Register";
function App() {
  const registerCaption = {
    text: 'Уже зарегистрированы?',
    linkText: 'Войти',
    path: '/sign-in',
  }

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
      </Routes>
    </div>
  );
}

export default App;
