import React,{ useState } from "react";
// import Modal from "react-animated-modal";
import "./App.css"
// import "react-datepicker/dist/react-datepicker.css";

import Topbar from "./components/topbar";

import Login from "./pages/login";
import Admins from "./pages/admins";
import Home from "./pages/Home";
import CareerTracks from "./pages/CareerTracks";
import Course from "./pages/Course";
import UserDashboard from "./pages/UserDashboard";
import { TRACKS } from "./shared/tracks";
import Video from "./pages/Video";

import Practice from "./pages/Practice";


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
          <Route path="/UserDashboard/:trackid" element={<UserDashboard completed = {TRACKS.filter((track) => track.isCompleted)} running = {TRACKS.filter((track) => track.isRunning)}/>}/>
          
          <Route path="/CareerTracks/:trackid" element={<CareerTracks/>}/>
          <Route path="/CareerTracks/:trackid/Course/:courseid" element={<Course/>}/>
          <Route path="/CareerTracks/:trackid/Course/:courseid/practice" element={<Practice/>}/>
          <Route path="/videos" element={<Video/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
