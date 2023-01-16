import React, {useState, useEffect} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import {MovieI} from "../../utils/MoviesApi";
import {EMPTY_SEARCH_TEXT, FIND_NOTHING_TEXT, FIRST_SEARCH_TEXT} from "../../utils/constants";

interface MoviesProps {
  movies: MovieI[];
  onSaveMovie: any; //TODO: исправить
  onRemoveMovie: any;
  onSearch: any;
  isDisable: boolean;
  onloadMore: any;
  hasLoadMore: any;
  onCheck: any;
  isFirstSearch: boolean;
}



const Movies: React.FC<MoviesProps> =
  ({
     movies,
     onSaveMovie,
     onRemoveMovie,
     onSearch,
     isDisable,
     onloadMore,
     hasLoadMore,
     onCheck,
     isFirstSearch,
   }) => {
    // @ts-ignore
    const initialShortFilms = JSON.parse(localStorage.getItem('shortFilmsThumb'));
    const initialSearchValue = localStorage.getItem('searchValue') || '';

    const [value, setValue] = useState<string>(initialSearchValue);
    const [shortFilmsThumb, setShortFilmsThumb] = useState<boolean>(initialShortFilms);
    const [validationMessage, setValidationMessage] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }

    const handleToggle = () => {
      setShortFilmsThumb(v => !v);
    }

    // проверка на пустой запрос
    const onSubmit = () => {
      if (!value) {
        setValidationMessage(EMPTY_SEARCH_TEXT);
      } else {
        onSearch(value, shortFilmsThumb);
      }
    }

    useEffect(() => {
      if (value && validationMessage) {
        setValidationMessage('');
      }
    }, [value, validationMessage])

    useEffect(() => {
      localStorage.setItem('shortFilmsThumb', JSON.stringify(shortFilmsThumb))
      onCheck(value, shortFilmsThumb);
    }, [shortFilmsThumb])

    const hasMovies = movies.length;
    const preloader = isDisable ? <Preloader/> : null;
    const moviesList = !isDisable && hasMovies ? (
      <MoviesCardList
        movies={movies}
        onSaveMovie={onSaveMovie}
        onRemoveMovie={onRemoveMovie}
      />
    ) : null;
    const loadMoreBtn = !isDisable && hasMovies && !hasLoadMore ? (
      <button type='button' onClick={onloadMore} className='movies__load-btn'>Ещё</button>
    ) : null;
    const message = isFirstSearch ? FIRST_SEARCH_TEXT : FIND_NOTHING_TEXT;
    const infoMessage = !isDisable && !hasMovies ? (
      <p className='movies__info-message'>{message}</p>
    ) : null;

    return (
      <main className='movies'>
        <div className="content-wrapper">
          <SearchForm
            value={value}
            validationMessage={validationMessage}
            onChange={onChange}
            onCheck={handleToggle}
            isChecked={shortFilmsThumb}
            onSubmit={onSubmit}
            required
          />
          {preloader}
          {moviesList} {/*Todo: фиксить весь компонент*/}
          {loadMoreBtn}
          {infoMessage}
        </div>
      </main>
    );
  };

export default Movies;