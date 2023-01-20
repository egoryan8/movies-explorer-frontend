import React, {useState, useEffect} from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import {NOT_FOUND_MESSAGE, NO_SAVED_FILMS_MESSAGE} from "../../utils/constants";
import {MovieI} from "../../utils/MoviesApi";
import {Link} from "react-router-dom";

interface SavedMoviesProps {
  movies: MovieI[],
  onRemoveMovie: (id: number) => void,
  onSearch: any,
  isDisabled: boolean,
  onCheck: any,
  hasSavedFilms: boolean,


}
const SavedMovies: React.FC<SavedMoviesProps> =
  ({
     movies,
     onRemoveMovie,
     onSearch,
     isDisabled,
     onCheck,
     hasSavedFilms,
   }) => {
    const [value, setValue] = useState<string>('');
    const [shortFilmsThumb, setShortFilmsThumb] = useState<boolean>(
      // @ts-ignore
      JSON.parse(localStorage.getItem('savedShortFilmsThumb')) || false
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }

    const onSubmit = () => {
      onSearch(value, shortFilmsThumb);
    }

    const handleToggle = () => {
      localStorage.setItem('savedShortFilmsThumb', String(shortFilmsThumb))
      setShortFilmsThumb(v => !v);
    }

    // фильтрация фильмов при изменении переключателя
    useEffect(() => {
      localStorage.setItem('savedShortFilmsThumb', String(shortFilmsThumb));
      onCheck(value, shortFilmsThumb);
    }, [shortFilmsThumb])

    const hasMovies = movies.length > 0;

    return (
      <main className='saved-movies'>
        <div className='content-wrapper'>
          <SearchForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            onCheck={handleToggle}
            isChecked={shortFilmsThumb}
          />
          {isDisabled && <Preloader/>}
          {!isDisabled && hasMovies
            && <MoviesCardList
              movies={movies}
              onRemoveMovie={onRemoveMovie}
            />}
          {!isDisabled && !hasMovies
            && <p className='saved-movies__info-message'>
              {hasSavedFilms
                ? NOT_FOUND_MESSAGE
                : <>
                {NO_SAVED_FILMS_MESSAGE}
                  <Link to='/movies' className="saved-movies__redirect">
                    &larr; Перейти на страницу со всеми фильмами
                  </Link>
                </>

              }
          </p>}
        </div>
      </main>
    );
  };

export default SavedMovies;