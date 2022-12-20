import React from 'react';
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";

const s = () => {
  return (
    <div>
      <Header className={"header_page_main"}/>
      <main className="content">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </main>
      <Footer/>
    </div>
  );
};

export default s;