import React from 'react';
import {Link} from "react-router-dom";
import ProfileIcon from "../../images/profile-icon.svg";
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="navigation__films-links">
        <Link to="/movies" className="navigation__link">Фильмы</Link>
        <Link to="/saved-movies" className="navigation__link">Сохранённые фильмы</Link>
      </div>
      <Link to="/profile" className="navigation__link">
        Аккаунт
        <button className="navigation__profile-button">
          <img src={ProfileIcon} alt="Иконка профиля"/>
        </button>
      </Link>
    </nav>
  );
};

export default Navigation;