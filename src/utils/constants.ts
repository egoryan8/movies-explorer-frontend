// параметры дозагрузки карточек
export interface CardsQuantityI {
  initial: number;
  additional: number;
  row: number;
}
export const DESKTOP_BREAKPOINT = 1024;
export const TABLET_BREAKPOINT = 768;
export const CARDS_QUANTITY_DESKTOP = { initial: 12, additional: 3, row: 3 };
export const CARDS_QUANTITY_TABLET = { initial: 8, additional: 2, row: 2 };
export const CARDS_QUANTITY_MOBILE = { initial: 5, additional: 2, row: 1 };
export const FIRST_SEARCH_MESSAGE = 'Введите запрос для поиска любимого фильма';
export const NOT_FOUND_MESSAGE = 'По вашему запросу ничего не найдено';
export const NO_SAVED_FILMS_MESSAGE = 'У вас нет сохраненных фильмов'
export const EMPTY_SEARCH_MESSAGE = 'Введите запрос';
export const TOKEN_ERROR = 'Передан невалидный токен. Повторите вход';
export const EMAIL_PATTERN = '[A-z0-9_.-]{1,}@[A-z0-9_.-]{1,}[.][A-z]{2,6}';