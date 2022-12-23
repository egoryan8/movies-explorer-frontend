import {Link} from 'react-router-dom';
import React from "react";
import {NavigationProps} from "./Navigation.props";
import './Navigation.css';

const Navigation: React.FC<NavigationProps> = ({ isVisible, onClose }) => {

  function handleCloseByOverlay (e: any) {
    if (e.target.classList.contains('navigation_visible')) {
      onClose();
    }
  };

  return (
    <div className={`navigation ${isVisible && 'navigation_visible'}`} onClick={handleCloseByOverlay} >
      <nav className={`navigation__inner ${isVisible && 'navigation__inner_visible'}`}>
        <ul className='navigation__links'>
          <li className='navigation__links-item navigation__links-item_type_mobile'>
            <Link className="navigation__link" to='/' onClick={onClose}>
              Главная
            </Link>
          </li>
          <li className='navigation__links-item'>
            <Link className="navigation__link" to='/movies' onClick={onClose}>
              Фильмы
            </Link>
          </li>
          <li className='navigation__links-item'>
            <Link className="navigation__link" to='/saved-movies' onClick={onClose}>
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
        <Link className='navigation__link navigation__link_type_icon' to='/profile' onClick={onClose}>
          Аккаунт
          <div className='navigation__link-icon navigation__link-icon_type_profile' />
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;