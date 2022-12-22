import React from 'react';
import {Link, useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";
import ProfileIcon from "../../images/profile-icon.svg";
import './Header.css';

const Header: React.FC = () => {
  const path = useLocation().pathname;
   const locationClass =
    path === "/"
      ? "header_type_landing"
      : path === "/" || path === "/movies" || path === "/saved-movies"
        ? "header_type_main"
        : "header_hidden";
  return (
    <header className={"header" + " " + locationClass}>
      <div className="content-wrapper">
        <div className="header__wrapper">
          <Logo/>
          {path === "/"
            ? <div className="header__auth-links">
              <Link className="header__auth-link" to="/sign-up">Регистрация</Link>
              <Link className="header__auth-link header__auth-link_contained" to="/sign-in">Войти</Link>
            </div>
            : <div className="header__navigation-links">
              <div className="header__films-links">
                <Link to="" className="header__link">Фильмы</Link>
                <Link to="" className="header__link">Сохранённые фильмы</Link>
              </div>
              <Link to="" className="header__link">
                Аккаунт
                <button className="header__profile-button">
                  <img src={ProfileIcon} alt="Иконка профиля"/>
                </button>
              </Link>
            </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;