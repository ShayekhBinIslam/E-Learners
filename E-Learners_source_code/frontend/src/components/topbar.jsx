import React from "react";
import "../styles/topbar.css";
import axios from "axios";

import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
// import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { TRACKS } from "../shared/tracks";
import { Link } from 'react-router-dom';
import Noty from "../pages/Noty";
import moment from "moment";
import emailjs from '@emailjs/browser';

import { useNavigate } from "react-router-dom";


import "../styles/dropdown.css";

import { ReactComponent as BellIcon } from "../icons/bell.svg";
import { ReactComponent as MessengerIcon } from "../icons/messenger.svg";
import { ReactComponent as CaretIcon } from "../icons/caret.svg";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
import { ReactComponent as CogIcon } from "../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../icons/bolt.svg";
import { notification } from 'antd';

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
  
  
  // if(localStorage.getItem('user_name') == ''){
  //   window.location.reload(true);
  // }
  // window.location.reload(false)

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const key = 'updatable';
  const form = useRef();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loginSuccess,setloginSuccess] = useState(false);


  //   const [regSuccess,setRegSuccess] = useState(false);
  const [userID,setUserID] = useState('');
  const [userName,setUserName] = useState('');
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(false);
  

  const[notificationCount,setNotificationCount] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("user_name") === null) {
      setToken(false);
    } else {
      setToken(true);
    }
    let data;
    
    axios.get('http://localhost:8000/getNotificationList/')
      .then(res=>{
        data = res.data;
        // setNotifications(
        //   data
        // );
        console.log(data.length);
        setNotificationCount(data.length);
      })
      .catch(err=>{})
      // console.log(notifications);
      // setMenuHeight(notifications.length*50+50);
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
        
        email: data.get('email'),
        password: data.get('password'),
        
    }
    // console.log(formValues);
    axios({
        method: "post",
        url: "http://localhost:8000/login/",
        data: actualData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(response => {
        
            
          //handle success
          
          setloginSuccess(true);
          
          console.log(response.status);
          setUserData(response.data); //setting user data
          setUserID(response.data.id);
          setUserName(response.data.name);
        //   localStorage.setItem('user_id',userID.toString());
          console.log(userID);
          console.log(userName);
          <Navigate to={"/UserDashboard/".concat(userID.toString())} replace={true} />
          
        })
        .catch((error) => {
          //handle error
          console.log("is it printing something");
          
        //   setloginSuccess(false);
          console.log(error);
        //   localStorage.setItem('user_id',userID.toString());
        });

        //---------------------mail & noti---------------------///
        emailjs.sendForm('service_l2yzioj', 'template_wqqt95m', form.current, 'mBlaVkVpg91XLATti')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
        ///---------------------posting db notifications-----------------///
        // const notyData = new FormData(e.currentTarget);
        
        const actualNotyData = {
            
            title : "Login",
            description : "You have logged in successfully to Elearners",
            userid : localStorage.getItem('user_id'),
            date : moment().format("YYYY-MM-DD HH:MM:SS"),
            link : "/",
            
        }
        // console.log(formValues);
        axios({
            method: "post",
            url: "http://localhost:8000/addNotification/",
            data: actualNotyData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(response => {
            
                
              console.log("notification sent");
              
            })
            .catch((error) => {
              //handle error
              console.log("is it printing something");
              // setloginAuth(false);
            //   setloginSuccess(false);
              console.log(error);
            //   localStorage.setItem('user_id',userID.toString());
            });
        //show notification
        notification.open({
            key,
            message: 'Successfully Logged in',
            description: 'WELCOME TO THE Elearners Family.',
          });
        
          setTimeout(() => {
            notification.open({
              key,
              message: 'Successfully Logged in',
              description: 'WELCOME TO THE Elearners Family.',
            });
          }, 2000);
        //--------------------mail & noti----------------------///
    
  };
  const handleInputChange = (e) => {
      const name = e.target.name;
      setFormValues({ ...formValues, [name]: e.target.value });
  };
  const navToHome = () => {
    localStorage.setItem('user_name','');
    localStorage.setItem('user_id','');

  }
  const navToUserProfile = () => {
    // localStorage.setItem('user_name','');
    <Navigate to={"/UserProfile/"} />

  }
  

  

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
        {console.log(localStorage.getItem('user_name'))}
        
        <div className="topRight">
          
          
          { localStorage.getItem('user_name') ? 

          <div  className="topbaricnos" ><Link to="/" className="topbaricnos" style={{ textDecoration: 'none'}}><Button className="topbaricnos" role='button' onClick={navToHome}>logout</Button>  </Link></div> :
          <div  className="topbaricnos" onClick={() => setShowRegisterForm(!showRegisterForm)}><Button className="topbaricnos" role='button'>Login</Button></div> }
          <Dialog
                open={showRegisterForm}
                fullWidth
                onClose={() => setShowRegisterForm(false)}
          >
              <DialogTitle>Log in</DialogTitle>
              <DialogContent>
                  <form onSubmit={onSubmit} ref={form}>
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
                              <button
                                            
                                  style={{ marginLeft: '15px' }}
                                  variant="contained"
                                  color="primary"
                                  type='submit'
                                  disableElevation
                                  className='btn-table'
                              >Login
                              
                              {/* <a disableElevation href={"/UserDashboard/".concat(runningID.toString())} onClick={submitForm}>Log in</a> */}
                              </button>
                              {loginSuccess ? localStorage.setItem('user_id',userID) : '' }
                              {loginSuccess ? localStorage.setItem('user_name',userName) : '' }
                              {loginSuccess ? <Navigate to={"/UserDashboard/".concat(userID.toString())} /> : '' }
                          </Grid>
                      </Grid>
                  </form>
              </DialogContent>
          </Dialog>
          <div className="notificationDropdown-container">
            {localStorage.getItem('user_id') ? 
            <div className="tracksDropdown-menu">
              <NavItemNoty icon={<Noty width={"30px"} color={"#122C34"} count={notificationCount} />} >
              
                <DropdownMenuNoty></DropdownMenuNoty>
              </NavItemNoty>
            </div>
            : ''}
          </div>
          <Link to="/UserProfile/" className="topbaricnos" style={{ textDecoration: 'none'}}>
            <Button className="topbaricnos" role='button' onClick={navToUserProfile}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
                className="topAvatar"
              />
            </Button>
          </Link>
          
          {/* <button className="topbaricnos" role='button' onClick={navToUserProfile}>
            
          </button> */}
          
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
function NavItemNoty(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {

  const [tracks, setTracks] = useState([]);

  function fechTracks(){
    
  }


  useEffect(() => {

    let data;
    let trackid=1;
    axios.get('http://localhost:8000/getTrackList/')
      .then(res=>{
        data = res.data;
        setTracks(
          data
        );
      })
      .catch(err=>{})
      console.log(tracks);
      setMenuHeight(tracks.length*50+50);

  }, [JSON.stringify(tracks)]);

  const [activeMenu, setActiveMenu] = useState("main");
  const [activeTrack, setActiveTrack] = useState(firstTrack);
  const [activeId, setActiveId] = useState(firstTrack);
  const [activeDes, setActiveDes] = useState(fistDes);
  const [menuHeight, setMenuHeight] = useState(null);
  // login check
  const [isLogin,setisLogin] = useState(false)
  const dropdownRef = useRef(null);

  // const navigate = useNavigate();

  // const goCTpage = (e) => {
  //   let patht = "./CareerTrack/";
  //   patht.concat(activeId);
  //   navigate(patht);
  // };
  

  useEffect(() => {
    setMenuHeight(tracks.length*50+50);
  });

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function setActiveDesName(id1, des1, name1) {
    localStorage.setItem('active_track_id',id1)
    localStorage.setItem('active_track_des',des1)
    localStorage.setItem('active_track_name',name1)
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
//----------------------------notification dropdown------------------------//
function DropdownMenuNoty() {

  const [notifications, setNotifications] = useState([]);
  const [isclicked,setIsClicked] = useState(false);


  


  useEffect(() => {

    let data;
    let trackid=1;
    axios.get('http://localhost:8000/getNotificationList/')
      .then(res=>{
        data = res.data;
        setNotifications(
          data
        );
        console.log(data.length);
        // setNotificationCount(data.length);
      })
      .catch(err=>{})
      console.log(notifications);
      setMenuHeight(notifications.length*50+50);

  }, [JSON.stringify(notifications)]);

  const [activeMenu, setActiveMenu] = useState("main");
  const [activeTrack, setActiveTrack] = useState(firstTrack);
  const [activeId, setActiveId] = useState(firstTrack);
  const [activeDes, setActiveDes] = useState(fistDes);
  const [menuHeight, setMenuHeight] = useState(null);
  // login check
  const [isLogin,setisLogin] = useState(false)
  const dropdownRef = useRef(null);

  // const navigate = useNavigate();

  // const goCTpage = (e) => {
  //   let patht = "./CareerTrack/";
  //   patht.concat(activeId);
  //   navigate(patht);
  // };
  

  useEffect(() => {
    setMenuHeight(notifications.length*50+50);
  });

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function setActiveDesName(id1, des1, name1) {
    localStorage.setItem('active_track_id',id1)
    localStorage.setItem('active_track_des',des1)
    localStorage.setItem('active_track_name',name1)
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
  const gotoLink= (notiID) =>{
    // var navigate = useNavigate();
    console.log("hello from gotolink");
    setIsClicked(true);
    let data,userid,noti_id;
    userid = localStorage.getItem("user_id");
    noti_id = notiID;
    console.log(noti_id);
    //------------------update isread value--------------//
    axios.post('http://localhost:8000/save_notification/', { 'id': noti_id,'userid': userid})
      .then(res=>{
        data = res.data;
        // this.setState({
        //   details: data
        // });
      })
      .catch(err=>{})
    // <Navigate to={"/UserDashboard/7"} />
    // <Navigate to="/"/>
    // navigate(`/Videos`);
  }

  return (
    <div className="dropDown-container">
      <div
        className="dropdownNoty"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <div className="menuNoty">
          
          {notifications.map((out) => (
            <div>
              <div>
                <DropdownItem goToMenu={out.id} name={out.title} des={out.description}>
                {/* <a href="/" className="btn-right-miNoty"> */}
                  <div className="notification-details"onClick={() => gotoLink(out.id)} >
                    <div className="notification-title">{out.title}</div>
                    <div className="notification-time">{moment(out.date).fromNow()}</div>
                    <div className="notification-des">{out.description}</div>
                    {console.log(out.link)}

                    {isclicked  ? <Navigate to={out.link} /> : '' }

                    {/* {isclicked ? <Navigate/>} */}
                    
                    
                  </div>
                  {/* </a> */}
                </DropdownItem>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="menu-item-right">
        <h4>{activeTrack}</h4>
        <br></br>
        {activeDes}
        <a 
        className="btn-right-mi"
        href={"/CareerTracks/".concat(activeId.toString()).concat("/User/").concat(localStorage.getItem('user_id').toString())}>Explore</a>
      </div> */}
    </div>
  );
}
//---------------------------notification dropdown------------------------//
