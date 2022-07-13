import React from 'react';
import "../styles/topbar.css";
//import {Notifications, Settings} from '@mui/icons-material';

export default function Topbar() {
  return (
    <div className='button-30'>
      <div className="topbarWrapper">
          <div className="topLeft">
              <span className='logo'>FinTech</span>
          </div>
          <div className="topRight">
              <div className="topbaricnos">
                {/* <Notifications/> */}
              </div>
              
              <div className="topbaricnos">
               {/* <Settings/> */}
              </div>
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="topAvatar" />
          </div>
      </div>
    </div>
  );
}
