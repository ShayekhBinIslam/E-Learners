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
  
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
    // useEffect(() => {
    // if (localStorage.getItem("user_name") === null) {
    //     setToken(false);
    // } else {
    //     setToken(true);
    // }
    // }, []);
    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormValues({ ...formValues, [name]: e.target.value });
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
        <div className="container emp-profile">
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={require("../assets/Home/profilephoto.jpg")} alt='no internet connection' width="400"/>

                    </div>
                    <div className="col-md-6 mt-5">
                        <div className="profile-head">
                            <h5>Saiful Islam</h5>
                            <h6>Web Developer</h6>
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

                    </div>
                    <div className="col-md-2 mt-5">
                        <div >
                            <button role="button" className="btn-right-mi" onClick={() => setShowRegisterForm(true)}>Edit Profile</button>
                        </div>
                        {console.log(showRegisterForm)}
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
                                            <button
                                                        
                                                style={{ marginLeft: '15px' }}
                                                variant="contained"
                                                color="primary"
                                                type='submit'
                                                disableElevation
                                                className='btn-table'
                                            >submit
                                            
                                            {/* <a disableElevation href={"/UserDashboard/".concat(runningID.toString())} onClick={submitForm}>Log in</a> */}
                                            </button>
                                            {/* {loginSuccess ? localStorage.setItem('user_id',userID) : '' }
                                            {loginSuccess ? localStorage.setItem('user_name',userName) : '' }
                                            {loginSuccess ? <Navigate to={"/UserDashboard/".concat(userID.toString())} /> : '' } */}
                                        </Grid>
                                    </Grid>
                                </form>
                            </DialogContent>
                        </Dialog>

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
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>"User ID"</label>

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

                            </div>
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