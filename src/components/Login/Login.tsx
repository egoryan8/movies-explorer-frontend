import React, { useState } from 'react';
import "./Login.css";
import {LoginData} from "../../utils/MainApi";

interface LoginProps {
  handler: (data: LoginData) => void;
}
const Register: React.FC<LoginProps> = ({handler}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    }
    handler(data);
  }
  return (
    <form className="login__wrapper" onSubmit={handleSubmit}>
      <fieldset className="login">
        <label className="login__label">
          E-mail
          <input
            type="email"
            className="login__input"
            placeholder="Введите email"
            value={email}
            onChange={onEmailChange}
          />
        </label>
        <label className="login__label">
          Пароль
          <input
            type="password"
            className="login__input"
            placeholder="Введите пароль"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
      </fieldset>
      <button className="login__button">Войти</button>
    </form>
  );
};

export default Register;