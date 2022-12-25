import React from 'react';
import SectionTitle from "../SectionTitle/SectionTitle";
import MyPhoto from '../../images/my-photo.jpg';
import './AboutMe.css'
import Portfolio from "../Portfolio/Portfolio";

const AboutMe: React.FC = () => {
  return (
    <section className="about-me">
      <div className="content-wrapper">
        <SectionTitle>Студент</SectionTitle>
        <div className="about-me__wrapper">
          <div className="about-me__text-wrapper">
            <h3 className="about-me__name">Егор</h3>
            <p className="about-me__status">Фронтенд-разработчик, 20 лет</p>
            <p className="about-me__paragraph">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
              компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
              ушёл с постоянной работы.
            </p>
            <a className="about-me__link" href="https://github.com/egoryan8" target="_blank">Github</a>
          </div>
          <img className="about-me__photo" src={MyPhoto} alt="Моё фото"/>
        </div>
        <Portfolio/>
      </div>
    </section>
  );
};

export default AboutMe;