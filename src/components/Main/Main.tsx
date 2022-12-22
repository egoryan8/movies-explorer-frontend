import React from 'react';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

const s = () => {
  return (
      <main className="content">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </main>
  );
};

export default s;