import React from 'react';
import "./Register.css";
const Register: React.FC = () => {
  return (
    <fieldset className="register">
      <label className="register__label">
        Имя
        <input type="text" className="register__input" placeholder="Введите имя"/>
      </label>
      <label className="register__label">
        E-mail
        <input type="email" className="register__input" placeholder="Введите email"/>
      </label>
      <label className="register__label">
        Пароль
        <input type="password" className="register__input register__input_error" placeholder="Введите пароль"/>
        <span className="register__error">Что-то пошло не так...</span>
      </label>
      <button className="register__button">Зарегестрироваться</button>
    </fieldset>
  );
};

export default Register;