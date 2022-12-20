import React from 'react';
import SectionTitle from "../SectionTitle/SectionTitle";
import './AboutProject.css';

const AboutProject: React.FC = () => {
  return (
    <section className="about-project">
      <div className="content-wrapper">
        <SectionTitle>О проекте</SectionTitle>
        <div className="about-project__cards">
          <div className="about-project__card">
            <h3 className="about-project__card-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__card-paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__card">
            <h3 className="about-project__card-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__card-paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__progress">
          <div className="about-project__progress-item">
            <div className="about-project__progress-week about-project__progress-week_accent">
              1 неделя
            </div>
            <div className="about-project__progress-side">Back-end</div>
          </div>
          <div className="about-project__progress-item">
            <div className="about-project__progress-week">
              4 недели
            </div>
            <div className="about-project__progress-side">Front-end</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;