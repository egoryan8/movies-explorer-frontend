import React from 'react';
import './Promo.css';
import PromoImage from '../../images/main-image.svg';

const Promo: React.FC = () => {
  return (
    <section className="promo">
      <div className="content-wrapper">
        <div className="promo__wrapper">
          <div>
            <h1 className="promo__title">Full-stack проект с поиском и сохранением в избранное фильмов.</h1>
            <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
          <img className="promo__image" src={PromoImage} alt="Земной шар из текста"/>
        </div>
        <a href="#about-project" className="promo__button">Узнать больше</a>
      </div>
    </section>
  );
};

export default Promo;