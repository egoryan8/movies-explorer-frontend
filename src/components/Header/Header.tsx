import React from 'react';
import {HeaderProps} from "./Header.props";
import './Header.css';
import {Link} from "react-router-dom";
import Logo from "../Logo/Logo";

const Header: React.FC<HeaderProps> = ({className}) => {
  return (
    <header className={"header" + " " + className}>
      <div className="content-wrapper">
        <div className="header__wrapper">
          <Logo/>
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