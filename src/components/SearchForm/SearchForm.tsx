import React, {Component} from 'react';
import './SearchForm.css';
import inputArrowIcon from '../../images/input-arrow.svg';

interface SearchFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: any; //TODO: исправить
  value: string;
  validationMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck: any;
  isChecked: boolean;
  onSubmit: () => void;
}

const SearchForm: React.FC<SearchFormProps> =
  ({
     onSearch,
     value,
     validationMessage,
     onChange,
     onCheck,
     isChecked,
     onSubmit,
     ...props
   }) => {

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    };

    return (
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__input-wrapper">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            name="search-film"
            value={value}
            onChange={onChange}
            {...props}
          />
          <span className='search-form__error'>{validationMessage}</span>
          <button className="search-form__button" type="submit">
            <div className="search-form__line"></div>
            <img src={inputArrowIcon} alt="стрелка вправо"/>
          </button>
        </div>
        <label htmlFor="search-form__short-films" className="search-form__short-films">
          <input
            type="checkbox"
            id="search-form__short-films"
            name="short-films-toggle"
            className="search-form__short-films-checkbox"
            checked={isChecked}
            onChange={onCheck}
          />
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