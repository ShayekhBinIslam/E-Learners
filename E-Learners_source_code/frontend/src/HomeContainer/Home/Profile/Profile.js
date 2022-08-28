import React,{useState,useRef,useEffect} from 'react'
import Typical from 'react-typical'
import "../../../index.css"
import "./Profile.css"
import axios from 'axios';
import { TRACKS } from '../../../shared/tracks'
import 'antd/dist/antd.css';
import { notification } from 'antd';
import moment from "moment";
import { useNavigate } from "react-router-dom";




import emailjs from '@emailjs/browser';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
  } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
  

export default function () {
    const form = useRef();
    const key = 'updatable';
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
      });
      const [showRegisterForm, setShowRegisterForm] = useState(false);
      const [showLoginForm, setShowLoginForm] = useState(false);
      const runningTrack = TRACKS.filter((track) => track.isRunning)[0];
      const [loginAuth,setloginAuth] = useState(true);
      const [loginSuccess,setloginSuccess] = useState(false);
      const [regSuccess,setregSuccess] = useState(false);

    //   const [regSuccess,setRegSuccess] = useState(false);
    //   const [userID,setUserID] = useState('');
    //   const [userMail,setUserMail] = useState('');
    //   const [userName,setUserName] = useState('');
      const [userData, setUserData] = useState({});
      const runningID = runningTrack.id;
      
      
      const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let temp_mail;
        temp_mail = data.get('email');
        const actualData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('confirm password'),
            // tc: data.get('tc'),
        }
        console.log(formValues);
        axios({
            method: "post",
            url: "http://localhost:8000/register/",
            data: actualData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              setregSuccess(true);
              localStorage.setItem('user_id',response.data.id);
              localStorage.setItem('user_name',response.data.name);
              localStorage.setItem('user_mail',data.get("email"));
              //sending email
              emailjs.sendForm('service_l2yzioj', 'template_wqqt95m', form.current, 'mBlaVkVpg91XLATti')
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
          e.target.reset();
          //show notification
          notification.open({
              key,
              message: 'Successfully Registered',
              description: 'WELCOME TO THE Elearners Family.',
          });
          
          setTimeout(() => {
              notification.open({
              key,
              message: 'Successfully Registered',
              description: 'WELCOME TO THE Elearners Family.',
              });
          }, 2000);
              const actualNotyData = {
                
                title : "Register",
                description : "You have Registered in successfully to Elearners",
                userid : localStorage.getItem('user_id'),
                date : moment().format("YYYY-MM-DD HH:MM:SS"),
            // navigate("/UserDashboard/".concat(localStorage.getItem('user_id')))

                
                link : "/UserDashboard/".concat(localStorage.getItem('user_id')),
                
            }
            // console.log(formValues);
            axios({
                method: "post",
                url: "http://localhost:8000/addNotification/",
                data: actualNotyData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(response => {
                    // console.log("var"+userID);
                    console.log("local"+localStorage.getItem('user_id'));
                    setloginAuth(true);
                    setloginSuccess(true);
                    // console.log();
                    console.log(response.status);
                
                    
                    console.log("notification sent");
                    navigate("/UserDashboard/".concat(localStorage.getItem('user_id')));

                
                })
              
            //   navigate("/UserDashboard/".concat(localStorage.getItem('user_id')));
              
            //   setUserID(response.data.id);
            //   setUserName(response.data.name);
            //   setUserMail(temp_mail);
              
              //handle success
            //   console.log(response);
            //   Navigate('/UserDashboard');
            })
            .catch(function (response) {
              //handle error
              console.log(response);
              setregSuccess(false);
            });
        

      };
    const navigate = useNavigate();
    const onSubmit2 = (e) => {
        
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let temp_mail;
        temp_mail = data.get("email");
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
              
              console.log(response.data.id);
              setUserData(response.data); //setting user data
            //   setUserID(response.data.id);
            //   console.log(userID);
            //   setUserName(response.data.name);
            //   setUserMail(temp_mail);
              localStorage.setItem('user_id',response.data.id);
              localStorage.setItem('user_name',response.data.name);
              localStorage.setItem('user_mail',data.get("email"));
            //   console.log("var"+userID);
              console.log("local"+localStorage.getItem('user_id'));
            //   localStorage.setItem('user_id',userID.toString());
            //   console.log(userID);
            //   console.log(userName);
              //sending email
                emailjs.sendForm('service_l2yzioj', 'template_wqqt95m', form.current, 'mBlaVkVpg91XLATti')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset();
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
            // setTimeout(2000);
            ///---------------------posting db notifications-----------------///
            // const notyData = new FormData(e.currentTarget);
            console.log("userid :"+localStorage.getItem("user_id"));
            const actualNotyData = {
                
                title : "Login",
                description : "You have logged in successfully to Elearners",
                userid : localStorage.getItem('user_id'),
                date : moment().format("YYYY-MM-DD HH:MM:SS"),
            // navigate("/UserDashboard/".concat(localStorage.getItem('user_id')))

                
                link : "/UserDashboard/".concat(localStorage.getItem('user_id')),
                
            }
            // console.log(formValues);
            axios({
                method: "post",
                url: "http://localhost:8000/addNotification/",
                data: actualNotyData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(response => {
                    // console.log("var"+userID);
                    console.log("local"+localStorage.getItem('user_id'));
                    setloginAuth(true);
                    setloginSuccess(true);
                    console.log(loginAuth);
                    console.log(response.status);
                
                    console.log("notification sent");
                    navigate("/UserDashboard/".concat(localStorage.getItem('user_id')));
                
                })
                .catch((error) => {
                //handle error
                console.log("is it printing something");
                setloginAuth(false);
                //   setloginSuccess(false);
                console.log(error);
                //   localStorage.setItem('user_id',userID.toString());
                });
            
            // console.log("var"+userID);
            console.log("local"+localStorage.getItem('user_id'));
            
            // navigate("/UserDashboard/".concat(localStorage.getItem('user_id')))
           

            //   <Navigate to={"/UserDashboard/".concat(userID.toString())} replace={true} />
              
            })
            .catch((error) => {
              //handle error
              console.log("is it printing something");
              setloginAuth(false);
            //   setloginSuccess(false);
              console.log(error);
            //   localStorage.setItem('user_id',userID.toString());
            });
            
            // window.location.reload(true);
        
      };
      const handleInputChange = (e) => {
          const name = e.target.name;
          setFormValues({ ...formValues, [name]: e.target.value });
    };
    function submitForm() {
        let form = document.getElementById("form__submit");
        form.submit();
      }
    
  return (
    
    <div className='profile-container'>
        <div className='profile-parent'>
            <div className='profile-details'>
                <div className='profile-details-name'>
                    <span className='primary-text'>
                        {" "}
                        <span className='highlighted-text'>
                            Welcome to the
                            <br></br>future of learning
                        </span>
                    </span>
                </div>
                <div className='profile-details-role'>
                    <span className='primary-text'>
                        {" "}
                        <h4>
                            {" "}
                            <Typical
                            loop={Infinity}
                            steps={[
                                "Learn new things everyday",
                                2000,
                                "Gain more technical Skills",
                                2000,
                            ]}
                            />
                        </h4>
                        <span className='profile-role-tagline'>
                            E-learners makes learning engaging & effective by leveraging deep pedagogy & <br></br>
                            cutting edge technology. With offerings ranging from adaptive self-learning  <br></br>
                            courses on apps & web to personalised 1-on-1 classes with expert teachers  <br></br>
                            for ages 4-18+, we have programs for every learner.
                        </span>
                    </span>
                </div>
                <div className='profile-options'>
                    <button className='btn highlighted-btn' onClick={() => setShowLoginForm(!showLoginForm)}>
                        {""}
                        Log in{""}
                    </button>
                    <Dialog
                        open={showLoginForm}
                        fullWidth
                        onClose={() => setShowLoginForm(false)}
                    >
                        <DialogTitle>Login</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onSubmit2} ref={form}>
                                <Grid container spacing={4}>
                                    {/* <Grid item xs={12}>
                                        <TextField
                                            label="Name"
                                            type="text"
                                            required
                                            fullWidth
                                            name="name"
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                        />
                                    </Grid> */}
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
                                    {/* <Grid item xs={12}>
                                        <TextField
                                            label="Phone"
                                            type="tel"
                                            name="phone"
                                            required
                                            fullWidth
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                        />
                                    </Grid> */}
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
                                        <button className='btn-table' variant="contained" onClick={() => setShowLoginForm(false)} disableElevation>
                                            Close
                                        </button>
                                        
                                        {loginAuth ? '' : <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>Incorrect Password or Email</span> }    
                                        
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
                                        {/* {loginSuccess ? localStorage.setItem('user_id',userID) : '' } */}
                                        {/* {loginSuccess ? localStorage.setItem('user_name',userName) : '' } */}
                                        {/* {loginSuccess ? localStorage.setItem('user_mail',userMail) : '' } */}
                                        {/* {loginSuccess ? <Navigate to={"/UserDashboard/".concat(userID.toString())} /> : '' } */}
                                        
                                        

                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>l
                    </Dialog>
                    <button className='btn primary-btn'onClick={() => setShowRegisterForm(!showRegisterForm)}>
                        {""}
                        Sign up{""}
                    </button>
                    <Dialog
                        open={showRegisterForm}
                        fullWidth
                        onClose={() => setShowRegisterForm(false)}
                    >
                        <DialogTitle>Register</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onSubmit} ref={form} id="form__submit">
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Name"
                                            type="text"
                                            required
                                            fullWidth
                                            name="name"
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
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
                                        <TextField
                                            label="Confirm Password"
                                            type="password"
                                            required
                                            name="confirm password"
                                            fullWidth
                                            value={formValues.password}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <Button variant="contained" className='btn-table' onClick={() => setShowRegisterForm(false)} disableElevation>
                                            Close
                                        </Button>
                                        {/* <a 
                                            className="btn-right-mi" style={{ marginLeft: '15px' }} variant="contained" disableElevation
                                            href={"/UserDashboard/".concat(runningID.toString())} onClick={submitForm}>Log in</a> */}
                                        
                                        <button
                                            
                                            style={{ marginLeft: '15px' }}
                                            variant="contained"
                                            color="primary"
                                            type='submit'
                                            disableElevation
                                            className='btn-table'
                                        >
                                            {/* <a 
                                            className="btn-right-mi" style={{ marginLeft: '15px' }} variant="contained" disableElevation
                                            href={"/UserDashboard/".concat(runningID.toString())} onClick={submitForm}>Log in</a> */}
                                            Sign up
                                        </button>
                                        {/* {regSuccess ? <Navigate to={"/UserDashboard/".concat(localStorage.getItem('user_id'))} /> : '' } */}

                                        {/* {regSuccess ? <Navigate to={"/UserDashboard/".concat(userID.toString())} /> : '' } */}
                                        {/* {regSuccess ? localStorage.setItem('user_id',userID) : '' } */}
                                        {/* {regSuccess ? localStorage.setItem('user_name',userName) : '' } */}
                                        {/* {regSuccess ? localStorage.setItem('user_mail',userMail) : '' } */}
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                

            </div>

            <div className='profile-picture'>
                    <div className='profile-picture-background'>

                    </div>
                </div>
        </div>
    </div>
  )
}
