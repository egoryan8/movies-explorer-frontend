import React from 'react';
import './Footer.css';
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <div className="footer__wrapper">
        <span className="footer__copy">&copy;2022</span>
        <ul className="footer__links-list">
          <li>
            <a href="" target="_blank" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a href="" target="_blank" className="footer__link">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;