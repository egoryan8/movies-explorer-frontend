import React from 'react';
import ArrowIcon from '../../images/arrow.svg';
import './Portfolio.css';
const Portfolio: React.FC = () => {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/egoryan8/owl-top" className="portfolio__link" target="_blank">
          <span className="portfolio__text">
            Агрегатор курсов на Next.js
          </span>
            <img src={ArrowIcon} alt="Иконка стрелочки"/>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/egoryan8/react-samurai" className="portfolio__link" target="_blank">
          <span className="portfolio__text">
            Cоциальная сеть
          </span>
            <img src={ArrowIcon} alt="Иконка стрелочки"/>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/egoryan8/lama-chat" className="portfolio__link" target="_blank">
          <span className="portfolio__text">
            Онлайн чат на Firebase
          </span>
            <img src={ArrowIcon} alt="Иконка стрелочки"/>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Portfolio;