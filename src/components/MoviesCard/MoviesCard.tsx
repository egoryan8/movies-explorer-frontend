import React, {useEffect, useMemo} from 'react';
import "./MoviesCard.css";
import {formatDuration} from "../../utils/helpers/formatDuration";
import {useLocation} from "react-router-dom";
import {log} from "util";

export interface MoviesCardProps {
  movieId?: number;
  title: string;
  duration: number;
  imageLink: string;
  trailerLink: string;
  onSaveMovie: any;
  onRemoveMovie: any;
  type?: string;
}

const MoviesCard: React.FC<MoviesCardProps> =
  ({
     movieId,
     title,
     duration,
     imageLink,
     trailerLink,
     onSaveMovie,
     onRemoveMovie,
     type = 'default',
   }) => {

    const formatedDuration = useMemo(() => formatDuration(duration), [duration])
    const location = useLocation().pathname;

    useEffect(() => {
      console.log(location);
      console.log('type', type);
    }, [location, type])

    return (
      <li className="movies-card">
        <a href={trailerLink} target="_blank" rel="noreferrer">
          <img src={imageLink} alt="" className="movies-card__image"/>
        </a>
        <div className="movies-card__overlay">
          {
            location === '/saved-movies'
              ? <div className="movies-card__overlay-cross" onClick={() => onRemoveMovie(movieId)}></div>
              : type === 'saved' ?
                <div className="movies-card__overlay-check" onClick={() => onRemoveMovie(movieId)}></div>
                : <div className="movies-card__overlay-save" onClick={() => onSaveMovie(movieId)}>Сохранить</div>
          }
        </div>
        <div className="movies-card__text-wrapper">
          <h3 className="movies-card__title">{title}</h3>
          <div className="movies-card__duration">{formatedDuration}</div>
        </div>
      </li>
    );
  };

export default MoviesCard;