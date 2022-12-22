import React from 'react';
import {Link, useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";
import './Header.css';
import Navigation from "../Navigation/Navigation";

const Header: React.FC = () => {
  const path = useLocation().pathname;
   const locationClass =
    path === "/"
      ? "header_type_landing"
      : path === "/" || path === "/movies" || path === "/saved-movies" || path === "/profile"
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
            : <Navigation/>}
        </div>
      </div>
    </header>
  );
};

export default Header;