import React from 'react';
import LogoIcon from '../../images/logo.svg';
import {HeaderProps} from "./Header.props";
import './Header.css';
import {Link} from "react-router-dom";

const Header: React.FC<HeaderProps> = ({className}) => {
  return (
    <header className={"header" + " " + className}>
      <div className="content-wrapper">
        <div className="header__wrapper">
          <img src={LogoIcon} alt="Лого"/>
          <div className="header__auth-links">
            <Link className="header__auth-link" to="/sign-up">Регистрация</Link>
            <Link className="header__auth-link header__auth-link_contained" to="/sign-in">Войти</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;