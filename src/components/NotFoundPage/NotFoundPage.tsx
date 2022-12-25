import React from 'react';
import {Link} from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="content-wrapper">
        <div className="not-found-page__wrapper">
          <h1 className="not-found-page__title">404</h1>
          <p className="not-found-page__paragraph">Страница не найдена</p>
        </div>
        <div className="not-found-page__link-wrapper">
          <Link to="/" className="not-found-page__link">Назад</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;