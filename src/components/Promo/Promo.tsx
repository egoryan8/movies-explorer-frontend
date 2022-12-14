import React from 'react';
import './Promo.css';
import PromoImage from '../../images/main-image.svg';

const Promo: React.FC = () => {
  return (
    <section className="promo">
      <div className="content-wrapper">
        <div className="promo__wrapper">
          <div>
            <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
            <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          </div>
          <img className="promo__image" src={PromoImage} alt="Земной шар из текста"/>
        </div>
        <button className="promo__button">Узнать больше</button>
      </div>
    </section>
  );
};

export default Promo;