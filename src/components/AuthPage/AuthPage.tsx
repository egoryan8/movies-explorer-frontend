import React from 'react';
import main from "../Main/Main";
import {Link} from "react-router-dom";
import {AuthPageProps} from "./AuthPage.props";
import "./AuthPage.css";
import Logo from "../Logo/Logo";
const AuthPage: React.FC<AuthPageProps> = ({title, caption,  children}) => {
  return (
    <main className="auth">
        <div className="auth__wrapper">
          <Logo/>
          <h1 className="auth__title">{title}</h1>
          <div className="auth__form">
            {children}
          </div>
          <div className="auth__caption-wrapper">
            <span className="auth__caption">
              {caption.text}
            </span>
            <Link className="auth__link" to={caption.path}>{caption.linkText}</Link>
          </div>
        </div>
    </main>
  );
};

export default AuthPage;