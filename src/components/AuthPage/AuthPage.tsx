import {Link, useNavigate} from 'react-router-dom';
import './AuthPage.css';
import React, {ReactNode, useEffect} from "react";
import Logo from "../Logo/Logo";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

interface AuthPageProps {
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  isValid: boolean;
  isLoading: boolean;
  error: string;
  type: string;
}

const AuthPage: React.FC<AuthPageProps> =
  ({
     children,
     title,
     onSubmit,
     isValid,
     isLoading,
     error,
     type
   }) => {

    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem('token')) {
        navigate('/');
      }
    }, [])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    }

    const texts = type === 'register'
      ? {
        buttonText: 'Зарегистрироваться',
        linkPath: '/sign-in',
        linkText: 'Войти',
        formCaption: 'Уже зарегистрированы?'
      } : {
        buttonText: 'Войти',
        linkPath: '/sign-up',
        linkText: 'Регистрация',
        formCaption: 'Ещё не зарегистрированы?'
      };

    return (
      <main className='auth-page'>
        <div className='auth-page__inner'>
          <Logo/>
          <h1 className='auth-page__heading'>{title}</h1>
          <form className='auth-page__form' name={type} onSubmit={handleSubmit}>
            <fieldset className='auth-page__form-fields'>
              {children}
            </fieldset>
            <div className='auth-page__button-wrapper'>
              <span className='auth-page__error-message'>{error}</span>
              <ButtonSubmit disabled={!isValid || isLoading}>
                {texts.buttonText}
              </ButtonSubmit>
            </div>
          </form>
          <div className='auth-page__caption'>
            <p className='auth-page__caption-text'>{texts.formCaption}</p>
            <Link className='auth-page__link' to={texts.linkPath}>
              {texts.linkText}
            </Link>
          </div>
        </div>
      </main>
    );
  }

export default AuthPage;