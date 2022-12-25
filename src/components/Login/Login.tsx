import React from 'react';
import "./Login.css";

const Register: React.FC = () => {
  return (
    <div className="login__wrapper">
      <fieldset className="login">
        <label className="login__label">
          E-mail
          <input type="email" className="login__input" placeholder="Введите email"/>
        </label>
        <label className="login__label">
          Пароль
          <input type="password" className="login__input" placeholder="Введите пароль"/>
        </label>
      </fieldset>
      <button className="login__button">Войти</button>
    </div>
  );
};

export default Register;