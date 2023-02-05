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
              Я родился и живу в Новосибирске, учусь в вузе на специальность программная инженерия.
              Начинал кодить еще со школы, в вузе писал на C, C++. Со временем понял, что хочу развиваться в веб-разработке.
              Люблю баскетбол, поэтому в свободное время меня можно найти на баскетбольном корте с мячиком в руках :)
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