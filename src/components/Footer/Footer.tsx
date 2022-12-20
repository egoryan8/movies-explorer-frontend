import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="content-wrapper">
        <div className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</div>
        <div className="footer__wrapper">
          <span className="footer__copy">&copy; 2022</span>
          <ul className="footer__links-list">
            <li>
              <a href="https://practicum.yandex.ru" target="_blank" className="footer__link">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a href="https://github.com/egoryan8" target="_blank" className="footer__link">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;