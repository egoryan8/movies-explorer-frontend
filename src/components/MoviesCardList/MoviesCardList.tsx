import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import {MovieI} from "../../utils/MoviesApi";

interface MoviesCardListProps {
  movies: MovieI[];
  onSaveMovie?: any;
  onRemoveMovie: any;
}

const MoviesCardList: React.FC<MoviesCardListProps> = ({movies, onSaveMovie, onRemoveMovie}) => {
  return (
      <ul className="movies-list">
        {movies.map(m => (
          <MoviesCard
            key={m.movieId}
            title={m.nameRU}
            imageLink={m.image}
            duration={m.duration}
            trailerLink={m.trailerLink}
            onSaveMovie={onSaveMovie}
            onRemoveMovie={onRemoveMovie}
            movieId={m.movieId}
            type={m.type}
          />
        ))}

      </ul>
  );
};

export default MoviesCardList;