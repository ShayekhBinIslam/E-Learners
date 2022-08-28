import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState,useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { TRACKS } from "../shared/tracks";
import { Link } from 'react-router-dom';
import axios from "axios";

import { Modal } from "antd";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
  } from '@material-ui/core';
const UserProfile = () =>{
    
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [token, setToken] = useState(false);
    const [user_content, setUserContent] = useState({
        "user_contents": [{"id":0,"name":"d","mail":"sdfsdf"}]
      });
  
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
    useEffect(() => {
        let data,userid;
        userid = localStorage.getItem('user_id')
        console.log(userid)
        
        axios.get(`http://localhost:8000/getUserDetails/?userid=${userid}`)
        .then(res=>{
            data = res.data;
            console.log(data)
            
            setUserContent(
            data
            );
        console.log(user_content)

            
            
        })
        .catch(err=>{})
    // if (localStorage.getItem("user_name") === null) {
    //     setToken(false);
    // } else {
    //     setToken(true);
    // }
    }, []);
    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
    };
    const navToEditProfile = () => {
        <Navigate to="/editProfile/" replace={true} />
        
    };
    
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
              
            //   setloginSuccess(true);
              
            //   console.log(response.status);
            //   setUserData(response.data); //setting user data
            //   setUserID(response.data.id);
            //   setUserName(response.data.name);
            // //   localStorage.setItem('user_id',userID.toString());
            //   console.log(userID);
            //   console.log(userName);
            //   <Navigate to={"/UserDashboard/".concat(userID.toString())} replace={true} />
              
            })
            .catch((error) => {
              //handle error
              console.log("is it printing something");
              
            //   setloginSuccess(false);
              console.log(error);
            //   localStorage.setItem('user_id',userID.toString());
            });
        
      };
    
    return (
        <>
                <div className="courseSidebar">
        <div className="cousreSidebarTrack">
          <img src={require("../assets/Home/profilephoto.jpg")}></img>
          <div className="courseSidebarTrackText">
            <div className="courseSidebarTrackText1">John</div>
            <div className="courseSidebarTrackText2">Good Morning</div>
          </div>
        </div>

        <div className="courseSidebarSplit"></div>
        <div className="courseSidebarMenu">
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Progress
          </div>
          <div
            className="cousreSidebarMenuItem"
            
          >
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Profile
          </div>
          <div className="cousreSidebarMenuItem-selected">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Free Time
          </div>
          {/* <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Attributes
          </div> */}
        </div>
      </div>
      
        <div className="container emp-profile">
        

            <div>

                <div className="row">
                    <div className="col-md-4">
                        <img src={require("../assets/Home/profilephoto.jpg")} alt='no internet connection' width="400"/>

                    </div>
                    <div className="col-md-6 mt-5">
                        {user_content.user_contents.map((out) => (
                            <div className="profile-head">
                            <h5>{out.name}</h5>
                            <h6>{out.expert}</h6>
                            <p className="profile-rating mt-3 mb-5">RANKINGS
                                <span>
                                    1/10
                                </span>
                            </p>
                            {/* <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="profile-tab"
                            className="mb-3"
                            >
                                <Tab eventKey="home" title="Home">
                                    
                                </Tab>
                                <Tab eventKey="home" title="Profile" className="ml-10">
                                    
                                </Tab>

                            </Tabs> */}
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                                </li> */}


                            </ul>
                        </div>
                        ))}
                        

                    </div>
                    <div className="col-md-2 mt-5">

                        <div >
                            <a  href={"/editProfile/"} className="btn-right-mi">
                                Edit Profile
                            </a>
                            {/* <button role="button" className="btn-right-mi" onClick={navToEditProfile}>Edit Profile</button> */}
                        </div>
                        {console.log(showRegisterForm)}
                        {/* <Dialog
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
                                            </Button> 
                                            <button
                                                        
                                                style={{ marginLeft: '15px' }}
                                                variant="contained"
                                                color="primary"
                                                type='submit'
                                                disableElevation
                                                className='btn-table'
                                            >submit

                                            </button>

                                        </Grid>
                                    </Grid>
                                </form>
                            </DialogContent>
                        </Dialog> */}

                    </div>

                </div>
                <div className="row">
                    {/* info */}
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p> 
                                Social Media
                            </p>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">Youtube</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">Instagram</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">FaceBook</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">Twitter</a>
                            <a href="https://www.youtube.com/watch?v=NgwRirOkSY4" target="_saiful">LinkedIN</a>

                        </div>


                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="mytabcontent">
                            {user_content.user_contents.map((out) => (
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>User ID</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>{out.id}</p>
                                    </div>

                                </div>
                                
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>User Name</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>{out.name}</p>
                                    </div>

                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>Email address</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>{out.mail}</p>
                                    </div>

                                </div>

                            </div>
                            ))}
                            {/* <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="row">
                                    <div className="col-md-6">
                                        <label>"User ID\\"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"2342342353454624"</p>
                                    </div>

                                </div>
                                
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>"User Name"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"Saiful Islam"</p>
                                    </div>

                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label>"Email address"</label>

                                    </div>
                                    <div className="col-md-6">
                                        <p>"saif@gmail.com"</p>
                                    </div>

                                </div>
                            </div> */}

                        </div>

                    </div>

                </div>

            </div>
        </div>
        </>
    )
}
export default UserProfile;