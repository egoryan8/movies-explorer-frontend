import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';
const Movies = () => {
  return (
    <main className="movies">
      <div className="content-wrapper">
        <SearchForm/>
        <MoviesCardList/>
      </div>
    </main>
  );
};

export default Movies ;