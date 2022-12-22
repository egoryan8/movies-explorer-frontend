import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <main className="profile">
      <div className="content-wrapper">
        <div className="profile__wrapper">
          <h1 className="profile__title">
            Привет, Виталий!
          </h1>
          <div className="profile__info">
            <div className="profile__item profile__item_type_name">
              <span className="profile__text">Имя</span>
              <span className="profile__text">Виталий</span>
            </div>
            <div className="profile__item profile__item_type_email">
              <span className="profile__text">E-mail</span>
              <span className="profile__text">pochta@yandex.ru</span>
            </div>
          </div>
          <div className="profile__buttons">
            <button className="profile__button">Редактировать</button>
            <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;