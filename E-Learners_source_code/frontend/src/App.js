import React,{ useState } from "react";
// import Modal from "react-animated-modal";
import "./App.css"
// import "react-datepicker/dist/react-datepicker.css";

import Topbar from "./components/topbar";

import Login from "./pages/login";
import Admins from "./pages/admins";
import Home from "./pages/Home";
import CareerTracks from "./pages/CareerTracks";


import {
  Routes,
  Route
} from "react-router-dom";

// import {useEffct} from 'react';

function App() {
  

  return (
    <div className="fintech">
      <Topbar/>
      
      <div className="appcontainer">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admins" element={<Admins/>}/>
          <Route path="/CareerTracks/:trackid" element={<CareerTracks/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
