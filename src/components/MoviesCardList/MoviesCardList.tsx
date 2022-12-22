import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import {MoviesCardListProps} from "./MoviesCardList.props";

const MoviesCardList: React.FC<MoviesCardListProps> = ({savedPage}) => {
  return (
    <div> {savedPage
      ?
      <ul className="movies-list">
        <MoviesCard saved={true} cross={true}/>
        <MoviesCard saved={true} cross={true}/>
        <MoviesCard saved={true} cross={true}/>
      </ul>
      :
      <ul className="movies-list">
        <MoviesCard saved={false}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={false}/>
        <MoviesCard saved={false}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={false}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={true}/>
        <MoviesCard saved={true}/>
      </ul>}
      {!savedPage && <button className="movies-list__button">Ещё</button>}
    </div>
  );
};

export default MoviesCardList;