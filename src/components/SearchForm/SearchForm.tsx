import React from 'react';
import './SearchForm.css';
import inputArrowIcon from '../../images/input-arrow.svg';
const SearchForm: React.FC = () => {
  return (
    <form className="search-form">
      <div className="search-form__input-wrapper">
        <input className="search-form__input" type="text" placeholder="Фильм"/>
        <button className="search-form__button">
          <div className="search-form__line"></div>
          <img src={inputArrowIcon} alt="стрелка вправо"/>
        </button>
      </div>
      <label htmlFor="search-form__short-films" className="search-form__short-films">
        <input type="checkbox" id="search-form__short-films" className="search-form__short-films-checkbox"/>
        <div className="search-form__thumb-wrapper">
          <div className="search-form__thumb-inner">
          </div>
        </div>
        <span className="search-form__short-films-text">
          Короткометражки
        </span>
      </label>
    </form>
  );
};

export default SearchForm;