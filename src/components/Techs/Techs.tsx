import React from 'react';
import SectionTitle from "../SectionTitle/SectionTitle";
import './Techs.css';

const Techs = () => {
  return (
    <section className="techs">
      <div className="content-wrapper">
        <SectionTitle>Технологии</SectionTitle>
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__paragraph">
          Самые основные технологии, которые были применены в этом проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__item">
            HTML
          </li>
          <li className="techs__item">
            CSS
          </li>
          <li className="techs__item">
            JS
          </li>
          <li className="techs__item">
            React
          </li>
          <li className="techs__item">
            TypeScript
          </li>
          <li className="techs__item">
            Express.js
          </li>
          <li className="techs__item">
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;