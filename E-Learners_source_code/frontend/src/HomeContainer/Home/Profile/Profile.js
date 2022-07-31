import React,{useState} from 'react'
import Typical from 'react-typical'
import "../../../index.css"
import "./Profile.css"
import axios from 'axios';
import { TRACKS } from '../../../shared/tracks'
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
      const [regSuccess,setRegSuccess] = useState(false);
      const [userID,setUserID] = useState('');
      const [userData, setUserData] = useState({});
      const runningID = runningTrack.id;
      
      const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
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
              //handle success
            //   console.log(response);
            //   Navigate('/UserDashboard');
                
                setRegSuccess(true);
                setUserData(response.data); //setting user data
                setUserID(response.data.id);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
              setRegSuccess(false);
            });

      };
      const onSubmit2 = (e) => {
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
              setloginAuth(true);
              setloginSuccess(true);
              console.log(loginAuth);
              console.log(response.status);
              setUserData(response.data); //setting user data
              setUserID(response.data.id);
            //   localStorage.setItem('user_id',userID.toString());
              console.log(userID);
              <Navigate to={"/UserDashboard/".concat(userID.toString())} replace={true} />
              
            })
            .catch((error) => {
              //handle error
              console.log("is it printing something");
              setloginAuth(false);
            //   setloginSuccess(false);
              console.log(error);
            //   localStorage.setItem('user_id',userID.toString());
            });
        
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
                            <form onSubmit={onSubmit2}>
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
                                        <Button variant="contained" onClick={() => setShowLoginForm(false)} disableElevation>
                                            Close
                                        </Button>
                                        
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
                                        {loginSuccess ? <Navigate to={"/UserDashboard/".concat(userID.toString())} /> : '' }
                                        {loginSuccess ? localStorage.setItem('user_id',userID) : '' }

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
                            <form onSubmit={onSubmit} id="form__submit">
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

                                        {regSuccess ? <Navigate to={"/UserDashboard/".concat(userID.toString())} /> : '' }
                                        {regSuccess ? localStorage.setItem('user_id',userID) : '' }
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
