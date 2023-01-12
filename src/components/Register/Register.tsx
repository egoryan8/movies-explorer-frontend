import React, { useState } from 'react';
import "./Register.css";
import {RegisterData} from "../../utils/api";

interface RegisterProps {
  handler: (data: RegisterData) => void;
}

const Register: React.FC<RegisterProps> = ({handler}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    }
    handler(data);
  }

  return (
    <form className="register__wrapper" onSubmit={handleSubmit}>
      <fieldset className="register">
        <label className="register__label">
          Имя
          <input
            type="text"
            className="register__input"
            placeholder="Введите имя"
            value={name}
            onChange={onNameChange}
          />
        </label>
        <label className="register__label">
          E-mail
          <input
            type="email"
            className="register__input"
            placeholder="Введите email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="register__label">
          Пароль
          <input
            type="password"
            className="register__input register__input_error"
            placeholder="Введите пароль"
            value={password}
            onChange={onPasswordChange}
          />
          <span className="register__error">Что-то пошло не так...</span>
        </label>
      </fieldset>
      <button className="register__button" type="submit">Зарегестрироваться</button>
    </form>
  );
};

export default Register;