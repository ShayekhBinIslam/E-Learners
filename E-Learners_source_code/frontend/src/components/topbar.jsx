import React from "react";
import "../styles/topbar.css";
import axios from "axios";

import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { TRACKS } from "../shared/tracks";

import "../styles/dropdown.css";

import { ReactComponent as BellIcon } from "../icons/bell.svg";
import { ReactComponent as MessengerIcon } from "../icons/messenger.svg";
import { ReactComponent as CaretIcon } from "../icons/caret.svg";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
import { ReactComponent as CogIcon } from "../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../icons/bolt.svg";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@material-ui/core';

// const tracks = [
//   {
//     id: 0,
//     name: "Web Development",
//     des: "This is Web Development Career Track",
//   }
//   ,
//   {
//     id: 1,
//     name: "Competetive Programming",
//     des: "This is Competetive Programming Career Track",
//   }
//   ,
//   { id: 2, name: "Math", des: "This is Math Career Track" },
//   { id: 3, name: "Design", des: "This is Desing Career Track" }
// ];

const firstTrack = "Web Development";
const fistDes = "This is Web Development Career Track";
const runningTrack = TRACKS.filter((track) => track.isRunning)[0];
const runningID = runningTrack.id;

export default function Topbar() {


  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const onSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        email: data.get('email'),
        password: data.get('password'),
      } 
      console.log(formValues);
  };
  const handleInputChange = (e) => {
      const name = e.target.name;
      setFormValues({ ...formValues, [name]: e.target.value });
  };
  

  

  return (
    <div className="topbar-container">
      <div className="topbarWrapper">
        <div className="topbarLeft-container">
          <div className="topLeft">
            <span className="logo">E-Learners</span>
          </div>

          <div className="tracksDropdown-container">
            Career Tracks
            <div className="tracksDropdown-menu">
              <NavItem icon={<CaretIcon />}>
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </div>
          </div>
        </div>

        <div className="topRight">
          <div  className="topbaricnos" onClick={() => setShowRegisterForm(!showRegisterForm)}>login</div>
          <Dialog
                open={showRegisterForm}
                fullWidth
                onClose={() => setShowRegisterForm(false)}
          >
              <DialogTitle>Log in</DialogTitle>
              <DialogContent>
                  <form onSubmit={onSubmit}>
                      <Grid container spacing={4}>
                          <Grid item xs={12}>
                              <TextField
                                  label="Email"
                                  type="email"
                                  name="email"
                                  required
                                  fullWidth
                                  value={formValues.email}
                                  onChange={handleInputChange}
                              />
                          </Grid>
                          
                          <Grid item xs={12}>
                              <TextField
                                  label="Password"
                                  type="password"
                                  required
                                  name="password"
                                  fullWidth
                                  value={formValues.password}
                                  onChange={handleInputChange}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <Button variant="contained" onClick={() => setShowRegisterForm(false)} disableElevation>
                                  Close
                              </Button>
                              {/* <Button
                                  style={{ marginLeft: '15px' }}
                                  variant="contained"
                                  color="primary"
                                  type='submit'
                                  disableElevation
                              >
                                  Login
                              </Button> */}
                              <a 
                                className="btn-right-mi" style={{ marginLeft: '15px' }} variant="contained" disableElevation
                                href={"/UserDashboard/".concat(runningID.toString())}>Log in</a>
                          </Grid>
                      </Grid>
                  </form>
              </DialogContent>
          </Dialog>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}


function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {

  const [tracks, setTracks] = useState([]);

  function fechTracks(){
    let data;
    let trackid=1;
    axios.get('http://localhost:8000/getTrackList/?track=2')
      .then(res=>{
        data = res.data;
        setTracks(
          data
        );
      })
      .catch(err=>{})
      console.log(tracks);
      setMenuHeight(tracks.length*50+50);
  }


  useEffect(() => {

    fechTracks();

  },[]);

  const [activeMenu, setActiveMenu] = useState("main");
  const [activeTrack, setActiveTrack] = useState(firstTrack);
  const [activeId, setActiveId] = useState(firstTrack);
  const [activeDes, setActiveDes] = useState(fistDes);
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  // const navigate = useNavigate();

  // const goCTpage = (e) => {
  //   let patht = "./CareerTrack/";
  //   patht.concat(activeId);
  //   navigate(patht);
  // };
  

  useEffect(() => {
    setMenuHeight(tracks.length*50+50);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function setActiveDesName(id1, des1, name1) {
    setActiveId(id1);
    setActiveDes(des1);
    setActiveTrack(name1);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onMouseEnter={() => setActiveDesName(props.goToMenu, props.des, props.name)}
      >
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropDown-container">
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <div className="menu">
          {tracks.map((out) => (
            <div>
              <div>
                <DropdownItem goToMenu={out.id} name={out.name} des={out.des}>
                  {out.name}
                </DropdownItem>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-item-right">
        <h4>{activeTrack}</h4>
        <br></br>
        {activeDes}
        <a 
        className="btn-right-mi"
        href={"/CareerTracks/".concat(activeId.toString()).concat("/User/").concat(localStorage.getItem('user_id').toString())}>Explore</a>
      </div>
    </div>
  );
}
