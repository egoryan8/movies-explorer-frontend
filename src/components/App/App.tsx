import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import React from "react";
function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
