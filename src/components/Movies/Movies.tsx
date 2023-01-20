import React, {useState, useEffect} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import {MovieI} from "../../utils/MoviesApi";
import {EMPTY_SEARCH_MESSAGE, NOT_FOUND_MESSAGE, FIRST_SEARCH_MESSAGE} from "../../utils/constants";

interface MoviesProps {
  movies: MovieI[];
  onSaveMovie: (id: number) => void;
  onRemoveMovie: (id: string) => void;
  onSearch: (searchValue: string, isShortFilm: boolean) => void;
  isDisable: boolean;
  onloadMore: () => void;
  hasLoadMore: boolean;
  onCheck: (searchValue: string, isShortFilm: boolean) => void;
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
    const onSubmit = () => {
      if (!value) {
        setValidationMessage(EMPTY_SEARCH_MESSAGE);
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

    const hasMovies = movies.length > 0;
    const message = isFirstSearch ? FIRST_SEARCH_MESSAGE : NOT_FOUND_MESSAGE;

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
          {isDisable && <Preloader/>}
          {!isDisable && hasMovies
            && <MoviesCardList
              movies={movies}
              onSaveMovie={onSaveMovie}
              onRemoveMovie={onRemoveMovie}
            />}
          {!isDisable && hasMovies && !hasLoadMore
            && <button type='button' onClick={onloadMore} className='movies__load-btn'>
              Ещё
            </button>}
          {!isDisable && !hasMovies
            && <p className='movies__info-message'>
            {message}
          </p>}
        </div>
      </main>
    );
  };

export default Movies;