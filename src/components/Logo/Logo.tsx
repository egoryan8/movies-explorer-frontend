import React from 'react';
import {Link} from "react-router-dom";
import "./Logo.css";

const Logo: React.FC = () => {
  return <Link to="/" className="logo"/>
};

export default Logo;