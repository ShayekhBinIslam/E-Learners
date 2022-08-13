import { Dialog } from "@material-ui/core";
import React, { useState } from 'react';

const imageUploader = () => {
    return(
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
    )
};
export default Dialog;