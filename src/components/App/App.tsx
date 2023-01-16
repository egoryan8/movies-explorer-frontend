import './App.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import React, {useEffect, useState} from "react";
import AuthPage from "../AuthPage/AuthPage";
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
  TOKEN_MISSMATCH_TEXT,
  UNAUTHORIZED_ERROR_CODE
} from "../../utils/constants";
import {getFilms, MovieI} from "../../utils/MoviesApi";

const registerCaption = {
  text: "Уже зарегистрированы?",
  linkText: "Войти",
  path: "/sign-in",
};

const loginCaption = {
  text: "Ещё не зарегистрированы?",
  linkText: "Регистрация",
  path: "/sign-up"
};

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
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
  // обрезанный отфильтрованный список beatFilms
  const [shownFindedMovies, setShownFindedMovies] = useState<MovieI[]>([]);
  // кол-во отображаемых и догружаемых по кнопке карточек
  const [cardsQty, setCardsQty] = useState<CardsQuantityI | null>(null);

  const setQty = () => setCardsQty(calcQuantityByPageWidth());

  useEffect(() => {
    calcQuantityByPageWidth();
    window.addEventListener('resize', setQty);
    return () => window.removeEventListener('resize', setQty);
  }, []);

  useEffect(() => {
    let shownMovies = moviesByThumb.slice(0, cardsQty?.initial);
    setShownFindedMovies(shownMovies);
  }, [moviesByThumb]);

  // перерисовка карточек при лайке / дизлайке
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

  // хранение фильмов в sessionStorage для восстановления хранилища при релоаде страницы

  useEffect(() => {
    const initialStorage = sessionStorage.getItem('movies');
    if (initialStorage) {
      setMovies(JSON.parse(initialStorage));
    }
  }, []);

  // аутентификация при монтировании приложения
  useEffect(() => {
    authUser();
  }, []);

  // получение фильмов пользователя при монтировании
  useEffect(() => {
    if (isLogged) {
      getSavedMovies();
    }
  }, [isLogged]);

  const handleRequestError = (err: any) => {
    if (err.status === UNAUTHORIZED_ERROR_CODE) {
      handleLogout();
      setIsModalErrorOpen(true);
      setErrorMessage(TOKEN_MISSMATCH_TEXT);
      console.log(TOKEN_MISSMATCH_TEXT);
      setTimeout(() => setIsModalErrorOpen(false), 3000)
      // разное время таймаутов для анимации плавного закрытия
      setTimeout(() => setErrorMessage(''), 4000)
    }
    setServerError(err.message);
    //показываю ошибку 3 секунды
    setTimeout(() => setServerError(''), 3000)
  };

  const loadMoreMovies = () => {
    const start = shownFindedMovies.length;

    // // догружаю больше карточек, если из-за ресайза образовались "пустоты"
    // const incompleteRow = (Math.abs(start - cardsQty!.initial)) % cardsQty!.row;
    // const additionalQuantity = incompleteRow && (cardsQty!.row - incompleteRow)

    const end = start + cardsQty!.additional;
    const additionalMovies = searchedMovies.slice(start, end);
    setShownFindedMovies([...shownFindedMovies, ...additionalMovies]); //TODO: исправить переменные
  }

  const getBeatfilmMovies = async () => {
    setIsDisable(true)
    try {
      const movies = await getFilms();
      console.log('movies: ', movies);
      setMovies(movies);
      return movies;
    } catch (err) {
      console.log(err)
    } finally {
      setIsDisable(false);
    }
  };
  // добавление в массив поля с типом фильма (лайкнут или нет)
  const showLikedMovies = (movies: MovieI[]) => {
    return movies.map(movie => {
      const match = savedMovies.find(({movieId}) => movieId === movie.movieId);
      return match ? {...movie, type: 'saved'} : {...movie, type: 'default'}
    });
  };
  // фильтрация фильмов по строке поиска и чекбоксу
  const filterMovies = (movies: MovieI[], searchValue: string, isShortFilm?: boolean) => {
    return movies.filter(({nameRU, nameEN, duration}) => {
      const textToMatch = (nameRU + nameEN).toLowerCase();
      const normalizedQuery = searchValue.toLowerCase();

      const toggle = isShortFilm ? duration <= 40 : true;
      return toggle && textToMatch.includes(normalizedQuery);
    })
  };
  // фильтрация фильмов при изменении переключателя в Movies
  const handleToggleMovies = (searchValue: string, isShortFilm: boolean) => {
    if (searchedMovies.length === 0) return;
    const filteredMovies = filterMovies(searchedMovies, searchValue, isShortFilm);
    setMoviesByThumb(filteredMovies);
  };
  // фильтрация фильмов при изменении переключателя в SavedMovies
  const handleToggleSavedMovies = (searchValue: string, isShortFilm: boolean) => {
    if (savedMovies.length === 0) return;
    const filteredMovies = filterMovies(savedMovies, searchValue, isShortFilm);
    setFilteredSavedMovies(filteredMovies);
  };
  // поиск по сохраненным фильмам (предварительно загруженным с mainApi)
  const searchSavedMovies = (searchValue: string, isShortFilm: boolean) => {
    const filteredMovies = filterMovies(savedMovies, searchValue, isShortFilm);
    setFilteredSavedMovies(filteredMovies);
  };
  // поиск фильмов в данных beatfilms
  const searchMovies = async (searchValue: string, isShortFilm: boolean) => {
    setIsFirstSearch(false);
    localStorage.setItem('searchValue', searchValue);
    localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));
    let tempMovies;
    if (movies.length === 0) {
      tempMovies = await getBeatfilmMovies();
      sessionStorage.setItem('movies', JSON.stringify(tempMovies));
    } else {
      tempMovies = movies;
    }
    if (tempMovies) {
      console.log('temp: ', tempMovies.map(m => ({...m, image: `https://api.nomoreparties.co${m.image.url}`})));
      const filteredMovies = filterMovies(tempMovies, searchValue);
      setSearchedMovies(filteredMovies);
      const filteredMoviesByThumb = filterMovies(filteredMovies, searchValue, isShortFilm);
      setMoviesByThumb(filteredMoviesByThumb);
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
    }
  };
  const handleRegister = async (data: RegisterData) => {
    try {
      const user = await register(data);
      setCurrentUser(user);
      setIsLogged(true);
      navigate('/sign-in')
    } catch (err) {
      console.log(err)
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
    } catch (err) {
      console.log(err)
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
      console.log('movie: ', movie);
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
      if (removedMovie) {
        await deleteMovie(String(removedMovie.movieId));
        setSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)]);
        setFilteredSavedMovies(movies => [...movies.filter((mov) => mov.movieId !== id)])
      }
    } catch (err) {
      handleRequestError(err);
    }
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
                onLoadMore={loadMoreMovies}
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
              <AuthPage
                title={"Добро пожаловать!"}
                caption={registerCaption}>
                <Register handler={handleRegister}/>
              </AuthPage>}
          />
          <Route
            path="sign-in"
            element={
              <AuthPage
                title={"Рады видеть!"}
                caption={loginCaption}>
                <Login handler={handleLogin}/>
              </AuthPage>}
          />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
