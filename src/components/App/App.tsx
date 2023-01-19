import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import React, {useEffect, useLayoutEffect, useState} from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  deleteMovie,
  getMovies,
  getUser,
  login,
  LoginData,
  register,
  RegisterData, saveMovie,
  UpdateData,
  updateUser
} from "../../utils/MainApi";
import {CurrentUserContext, UserI} from "../../contexts/currentUserContext";
import {calcQuantityByPageWidth} from "../../utils/helpers/calcQuantityByPageWidth";
import {
  CardsQuantityI,
} from "../../utils/constants";
import {getFilms, MovieI} from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserI | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [savedMovies, setSavedMovies] = useState<MovieI[]>([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState<MovieI[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<MovieI[]>([]);
  const [moviesByThumb, setMoviesByThumb] = useState<MovieI[]>([]);
  const [shownFindedMovies, setShownFindedMovies] = useState<MovieI[]>([]);
  const [cardsQty, setCardsQty] = useState<CardsQuantityI | null>(null);

  const setQty = () => {
    setTimeout(() => {
      setCardsQty(calcQuantityByPageWidth())
    }, 300)
  };

  useLayoutEffect(() => {
    setQty();
  }, [])

  useEffect(() => {
    calcQuantityByPageWidth();
    window.addEventListener('resize', setQty);
    return () => window.removeEventListener('resize', setQty);
  }, []);

  useEffect(() => {
    let shownMovies = moviesByThumb.slice(0, cardsQty?.initial);
    setShownFindedMovies(shownMovies);
  }, [moviesByThumb]);

  useEffect(() => {
    if (savedMovies.length > 0) {
      showLikedMovies(shownFindedMovies);
    }
  }, [savedMovies.length]);

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchedMovies');
    if (savedSearch) {
      setSearchedMovies(JSON.parse(savedSearch));
    }
  }, []);

  useEffect(() => {
    const initialStorage = sessionStorage.getItem('movies');
    if (initialStorage) {
      setMovies(JSON.parse(initialStorage));
    }
  }, []);

  useEffect(() => {
    authUser();
  }, []);

  useEffect(() => {
    if (isLogged) {
      getSavedMovies();
    }
  }, [isLogged]);

  const handleRequestError = (err: any) => {
    setIsModalErrorOpen(true);
    setServerError(err.message);
    setErrorMessage(err.message);
    setTimeout(() => setIsModalErrorOpen(false), 3000)
    setTimeout(() => setServerError(''), 3000)
  };

  const loadMoreMovies = () => {
    const start = shownFindedMovies.length;
    const end = start + cardsQty!.additional;
    const additionalMovies = searchedMovies.slice(start, end);
    setShownFindedMovies([...shownFindedMovies, ...additionalMovies]);
  }

  const getBeatfilmMovies = async () => {
    setIsDisable(true)
    try {
      const movies = await getFilms();
      setMovies(movies);
      return movies;
    } catch (err) {
      console.log(err)
    } finally {
      setIsDisable(false);
    }
  };
  const showLikedMovies = (movies: MovieI[]) => {
    return movies.map(movie => {
      const match = savedMovies.find(({movieId}) => movieId === movie.movieId);
      return match ? {...movie, type: 'saved'} : {...movie, type: 'default'}
    });
  };
  const filterMovies = (movies: MovieI[], searchValue: string, isShortFilm?: boolean) => {
    return movies.filter(({nameRU, nameEN, duration}) => {
      const textToMatch = (nameRU + nameEN).toLowerCase();
      const normalizedQuery = searchValue.toLowerCase();

      const toggle = isShortFilm ? duration <= 40 : true;
      return toggle && textToMatch.includes(normalizedQuery);
    })
  };
  const handleToggleMovies = (searchValue: string, isShortFilm: boolean) => {
    if (searchedMovies.length === 0) return;
    const filteredMovies = filterMovies(searchedMovies, searchValue, isShortFilm);
    setMoviesByThumb(filteredMovies);
  };
  const handleToggleSavedMovies = (searchValue: string, isShortFilm: boolean) => {
    if (savedMovies.length === 0) return;
    const filteredMovies = filterMovies(savedMovies, searchValue, isShortFilm);
    setFilteredSavedMovies(filteredMovies);
  };
  const searchSavedMovies = (searchValue: string, isShortFilm: boolean) => {
    const filteredMovies = filterMovies(savedMovies, searchValue, isShortFilm);
    setFilteredSavedMovies(filteredMovies);
  };
  const searchMovies = async (searchValue: string, isShortFilm: boolean) => {
    setIsFirstSearch(false);
    localStorage.setItem('searchValue', searchValue);
    localStorage.setItem('shortFilmsThumb', JSON.stringify(isShortFilm));
    let tempMovies;
    if (movies.length === 0) {
      tempMovies = await getBeatfilmMovies();
      sessionStorage.setItem('movies', JSON.stringify(tempMovies));
    } else {
      tempMovies = movies;
    }
    if (tempMovies) {
      const filteredMovies = filterMovies(tempMovies, searchValue);
      setSearchedMovies(filteredMovies);
      const filteredMoviesByThumb = filterMovies(filteredMovies, searchValue, isShortFilm);
      setMoviesByThumb(filteredMoviesByThumb);
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
    }
  };

  const handleLogin = async (data: LoginData) => {
    try {
      const {token} = await login(data);
      localStorage.setItem('token', token);
      const user = await getUser(token);
      setCurrentUser(user);
      setIsLogged(true);
      navigate('/movies');
    } catch (err: any) {
      handleRequestError(err);
    }
  };
  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      const loginData = {
        email: data.email,
        password: data.password,
      }
      await handleLogin(loginData);
      // navigate('/movies');
    } catch (err) {
      handleRequestError(err);
    }
  };

  // аутентификация при монтировании приложения
  const authUser = async () => {
    try {
      const user = await getUser(localStorage.getItem('token') || '');
      if (user.email) {
        setIsLogged(true);
        setCurrentUser(user);
      }
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    setIsLogged(false);
    setCurrentUser(null);
    setIsFirstSearch(true);

    setMovies([]);
    setSearchedMovies([]);
    setShownFindedMovies([]);
    setMoviesByThumb([]);

    setSavedMovies([]);
    setFilteredSavedMovies([])

    localStorage.clear();
    sessionStorage.clear();

    navigate('/');
  }

  // универсальная обработка ошибкок для запросов

  const updateUserInfo = async (userData: UpdateData) => {
    setIsDisable(true);
    try {
      const user = await updateUser(userData);
      setCurrentUser(user);
    } catch (err) {
      handleRequestError(err);
    }
    setIsDisable(false);
  }
  const getSavedMovies = async () => {
    try {
      const savedMovies = await getMovies();
      setSavedMovies(savedMovies);
      setFilteredSavedMovies(savedMovies);
    } catch (err) {
      handleRequestError(err);
    }
  };
  const handleSaveMovie = async (id: number) => {
    try {
      const movie = searchedMovies.find(item => item.movieId === id);
      if (movie) {
        const savedMovie = await saveMovie(movie);
        setSavedMovies(movies => [...movies, savedMovie])
        setFilteredSavedMovies(movies => [...movies, savedMovie]);
      }
    } catch (err) {
      handleRequestError(err);
    }
  };
  const handleRemoveMovie = async (id: number) => {
    try {
      const removedMovie = savedMovies.find(movie => movie.movieId === id);
      if (removedMovie?._id) {
        await deleteMovie(removedMovie._id);
        setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
        setFilteredSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)])
      }
    } catch (err) {
      handleRequestError(err);
    }
  }

  if (isDisable) {
    return <Preloader/>
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogged={isLogged}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                Component={Movies}
                isLogged={isLogged}
                movies={showLikedMovies(shownFindedMovies)}
                onSaveMovie={handleSaveMovie}
                onRemoveMovie={handleRemoveMovie}
                onSearch={searchMovies}
                isDisable={isDisable}
                onloadMore={loadMoreMovies}
                hasLoadMore={shownFindedMovies.length === moviesByThumb.length}
                onCheck={handleToggleMovies}
                isFirstSearch={isFirstSearch}
              />
            }/>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                Component={SavedMovies}
                isLogged={isLogged}
                movies={filteredSavedMovies.map(movie => ({ ...movie, type: 'remove' }))}
                onRemoveMovie={handleRemoveMovie}
                onSearch={searchSavedMovies}
                isDisable={isDisable}
                onCheck={handleToggleSavedMovies}
                hasSavedFilms={savedMovies.length}
              />
            }/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                Component={Profile}
                isLogged={isLogged}
                logout={handleLogout}
                onSubmit={updateUserInfo}
                error={serverError}
                isLoading={isLoading}
              />
            }/>
          <Route
            path="sign-up"
            element={
            <Register
              onSubmit={handleRegister}
              error={serverError}
              isLoading={isDisable}
            />}
          />
          <Route
            path="sign-in"
            element={
            <Login
              onSubmit={handleLogin}
              error={serverError}
              isLoading={isDisable}
            />}
          />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        <Footer/>
        <div className={`error-popup ${isModalErrorOpen && 'error-popup_visible'}`}>
          {errorMessage}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
