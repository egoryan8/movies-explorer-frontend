import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
const SavedMovies = () => {
  return (
      <main className="saved-movies">
        <div className="content-wrapper">
          <SearchForm/>
          <MoviesCardList savedPage={true}/>
        </div>
      </main>
  );
};

export default SavedMovies;