import React from 'react'
import Typical from 'react-typical'
import "../../../index.css"
import "./Profile.css"

export default function () {
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
                            BYJU'S makes learning engaging & effective by leveraging deep pedagogy & <br></br>
                            cutting edge technology. With offerings ranging from adaptive self-learning  <br></br>
                            courses on apps & web to personalised 1-on-1 classes with expert teachers  <br></br>
                            for ages 4-18+, we have programs for every learner.
                        </span>
                    </span>
                </div>
                <div className='profile-options'>
                    <button className='btn highlighted-btn'>
                        {""}
                        Log in{""}
                    </button>
                    <button className='btn primary-btn'>
                        {""}
                        Sign up{""}
                    </button>
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
