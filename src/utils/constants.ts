// параметры дозагрузки карточек
export interface CardsQuantityI {
  initial: number;
  additional: number;
  row: number;
}
export const DESKTOP_BREAKPOINT = 1180;
export const TABLET_BREAKPOINT = 720;
export const CARDS_QUANTITY_DESKTOP = { initial: 12, additional: 3, row: 3 };
export const CARDS_QUANTITY_TABLET = { initial: 8, additional: 2, row: 2 };
export const CARDS_QUANTITY_MOBILE = { initial: 5, additional: 2, row: 1 };

// информационные сообщения для интерфейса
export const SUCCESS_PROFILE_MESSAGE = 'Данные профиля изменены';
export const FIRST_SEARCH_TEXT = 'Введите запрос и добавьте понравившиеся фильмы';
export const FIND_NOTHING_TEXT = 'По запросу ничего не найдено';
export const NO_SAVED_FILMS_TEXT = 'Сейчас у вас нет сохраненных фильмов. Добавьте понравившиеся через форму поиска на странице "фильмы"'
export const EMPTY_SEARCH_TEXT = 'Нужно ввести ключевое слово';
export const TOKEN_MISSMATCH_TEXT = 'Ошибка при выполнении действия: передан невалидный токен. Требуется повторный вход в профиль';

export const UNAUTHORIZED_ERROR_CODE = 401;

export const EMAIL_PATTERN = '[A-z0-9_.-]{1,}@[A-z0-9_.-]{1,}[.][A-z]{2,6}';