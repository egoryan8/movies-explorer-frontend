import React, { useContext } from 'react';
import './Profile.css';
import {CurrentUserContext} from "../../contexts/currentUserContext";

interface ProfileProps {
  logout: () => void;
}
const Profile: React.FC<ProfileProps> = ({logout}) => {
  const user = useContext(CurrentUserContext);

  return (
    <main className="profile">
      <div className="content-wrapper">
        <div className="profile__wrapper">
          <h1 className="profile__title">
            Привет, {user?.name}!
          </h1>
          <div className="profile__info">
            <div className="profile__item profile__item_type_name">
              <span className="profile__text">Имя</span>
              <span className="profile__text">{user?.name}</span>
            </div>
            <div className="profile__item profile__item_type_email">
              <span className="profile__text">E-mail</span>
              <span className="profile__text">{user?.email}</span>
            </div>
          </div>
          <div className="profile__buttons">
            <button className="profile__button">Редактировать</button>
            <button className="profile__button profile__button_type_exit" onClick={logout}>Выйти из аккаунта</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;