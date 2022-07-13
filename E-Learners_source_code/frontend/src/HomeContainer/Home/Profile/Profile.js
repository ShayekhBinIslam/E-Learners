import React,{useState} from 'react'
import Typical from 'react-typical'
import "../../../index.css"
import "./Profile.css"
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
  } from '@material-ui/core';
  

export default function () {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
      const [showRegisterForm, setShowRegisterForm] = useState(false);
      const [showLoginForm, setShowLoginForm] = useState(false);
      const onSubmit = (e) => {
          e.preventDefault();
          console.log(formValues);
      };
      const handleInputChange = (e) => {
          const name = e.target.name;
          setFormValues({ ...formValues, [name]: e.target.value });
    };
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
                            <form onSubmit={onSubmit}>
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
                                        <Button
                                            style={{ marginLeft: '15px' }}
                                            variant="contained"
                                            color="primary"
                                            type='submit'
                                            disableElevation
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
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
                        <DialogTitle>Login</DialogTitle>
                        <DialogContent>
                            <form onSubmit={onSubmit}>
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
                                            label="Phone"
                                            type="tel"
                                            name="phone"
                                            required
                                            fullWidth
                                            value={formValues.phone}
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
                                        <Button
                                            style={{ marginLeft: '15px' }}
                                            variant="contained"
                                            color="primary"
                                            type='submit'
                                            disableElevation
                                        >
                                            Login
                                        </Button>
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
