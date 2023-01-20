import React, {useContext, useEffect, useState} from 'react';
import './Profile.css';
import {CurrentUserContext} from "../../contexts/currentUserContext";
import ProfileInput from "../ProfileInput/ProfileInput";
import {EMAIL_PATTERN} from "../../utils/constants";
import useFormWithValidation from "../../utils/hooks/useFormWithValidation";

interface ProfileProps {
  onSubmit: (values: Record<string, string>) => void;
  error: string;
  isLoading: boolean;
  logout: () => void;
  successMessage: string;
}

const Profile: React.FC<ProfileProps>
  = ({
       onSubmit,
       error,
       isLoading,
       logout,
       successMessage
     }) => {
  const user = useContext(CurrentUserContext);
  const [isUserUpdated, setIsUserUpdated] = useState<boolean>(false);

  const {
    values,
    errors,
    isValid,
    onChange,
    resetForm,
  } = useFormWithValidation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    if (user && (values.name !== user.name || values.email !== user.email)) {
      setIsUserUpdated(true);
    } else {
      setIsUserUpdated(false);
    }
  }, [values?.name, values?.email]);

  // подстановка данных профиля при монтировании
  useEffect(() => {
    resetForm({name: user?.name, email: user?.email});
  }, [user]);

  return (
    <main className='profile'>
      <div className='profile__inner'>
        <h1 className='profile__heading'>Привет, {user?.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <fieldset className='profile__form-fields'>
            <ProfileInput
              name='name'
              title='Имя'
              type='text'
              value={values.name}
              error={errors.name}
              onChange={onChange}
              variant='min'
              minLength={3}
              required
            />
            <ProfileInput
              name='email'
              title='E-mail'
              type='email'
              value={values.email}
              error={errors.email}
              onChange={onChange}
              variant='min'
              pattern={EMAIL_PATTERN}
              required
            />
          </fieldset>
          <div className='profile__buttons'>
            <span className={`profile__message ${error && 'profile__message_type_error'}`}>
              {successMessage || error}
            </span>
            <button
              className='profile__button'
              type='submit'
              disabled={!isValid || !isUserUpdated || isLoading}
            >
              Редактировать
            </button>
            <button className='profile__button profile__button_type_danger' type='button' onClick={logout}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;