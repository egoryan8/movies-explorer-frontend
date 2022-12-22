import React from 'react';
import MovieIcon from '../../images/movie.png';
import "./MoviesCard.css";
import {MoviesCardProps} from "./MoviesCard.props";
const MoviesCard: React.FC<MoviesCardProps> = ({saved, cross}) => {
  return (
    <li className="movies-card">
      <img src={MovieIcon} alt="" className="movies-card__image"/>
      <div className="movies-card__overlay">
        {
          saved
          ? cross
              ? <div className="movies-card__overlay-cross"></div>
              : <div className="movies-card__overlay-check"></div>
          : <div className="movies-card__overlay-save">Сохранить</div>
        }
      </div>
      <div className="movies-card__text-wrapper">
        <h3 className="movies-card__title">33 слова о дизайне</h3>
        <div className="movies-card__duration">1ч 17м</div>
      </div>
    </li>
  );
};

export default MoviesCard ;