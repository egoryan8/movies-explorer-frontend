import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Logo from "../Logo/Logo";
import './Header.css';
import Navigation from "../Navigation/Navigation";

interface HeaderProps {
  isLogged: boolean;
}

const Header: React.FC<HeaderProps> = ({isLogged}) => {
  const path = useLocation().pathname;
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const openBurger = () => {
    setIsBurgerOpened(state => !state);
  };

  const closeBurger = () => {
    setIsBurgerOpened(false);
  }

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
          {path !== "/"
            && <button
              className={`header__burger ${isBurgerOpened ? 'header__burger_opened' : ''}`}
              type='button'
              onClick={openBurger}
            />}
          {path === "/"
            ? isLogged ?
              <Navigation isVisible={isBurgerOpened} onClose={closeBurger}/>
              :
              <div className="header__auth-links">
                <Link className="header__auth-link" to="/sign-up">Регистрация</Link>
                <Link className="header__auth-link header__auth-link_contained" to="/sign-in">Войти</Link>
              </div>
            : <Navigation isVisible={isBurgerOpened} onClose={closeBurger}/>}
        </div>
      </div>
    </header>
  );
};

export default Header;