import React from 'react';
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";

const s = () => {
  return (
    <div>
      <Header className={"header_page_main"}/>
      <main className="content">
        <Promo/>
        <AboutProject/>
        <Techs/>
      </main>
    </div>
  );
};

export default s;