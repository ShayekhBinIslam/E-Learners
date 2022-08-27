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
import Quiz from "./pages/Quiz";
import Freetime from "./pages/Freetime";
import Recom from "./pages/Recom";
import CourseRecom from "./pages/CourseRecom";

import Practice from "./pages/Practice";


import {
  Routes,
  Route
} from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import DailyChallenge from "./pages/DailyChallenge";

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
          
          <Route path="/CareerTracks/:trackid/User/:userid" element={<CareerTracks/>}/>
          <Route path="/CareerTracks/:trackid/Course/:courseid" element={<Course/>}/>
          <Route path="/CareerTracks/:trackid/Course/:courseid/practice" element={<Practice/>}/>
          <Route path="/CareerTracks/:trackid/Course/:courseid/practice/:practiceid/mode/:mode" element={<Quiz/>}/>
          <Route path="/CareerTracks/:trackid/Course/:courseid/DailyChallenge" element={<DailyChallenge/>}/>

          <Route path="/videos" element={<Video/>}/>
          <Route path="/freetime" element={<Freetime/>}/>
          <Route path="/recom" element={<Recom/>}/>
          <Route path="/courseRecom" element={<CourseRecom/>}/>
          <Route path="/UserProfile/" element={<UserProfile/>}/>
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
