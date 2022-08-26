import React from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import "../styles/CareerTracks.css";
import { TRACKS } from "../shared/tracks";
import "../styles/Course.css";
import "../styles/UserDashboard.css"
import { useEffect, useState } from "react";
import axios from 'axios';
import { notification } from 'antd';

// function RenderCompletedItem({ course }) {
//   //console.log(course.image);

//   // first fetch img from backend
//   // save it in here :"../assets/card/"
//   // image variable only have image name 

//   let imagee = "design.png";

//   return (
//     <div className="card 1">
//       <div className="imgg">
//         <img src={require(`../assets/card/${imagee}`)}></img>
//       </div>

//       <div className="card_title title-black">
//         <p>{"name"}</p>
//       </div>
//     </div>
//   );
// }


export default function UserDashboard(props) {
  const key = 'updatable';
  const { trackid } = useParams();
  const [runningTrack, setRunningTrack] = useState([]);
  const [completedTrack, setCompletedTrack] = useState([]);
  const [running_track_content, setRunningTrackContent] = useState({
    "running_tracks": [{"id":0,"title":"dfss","des":"sdfsdf"}]
  });
  const [completed_track_content, setCompletedTrackContent] = useState({
    "completed_tracks": [{"id":0,"title":"dfss","des":"sdfsdf"}]
  });
  console.log(localStorage.getItem('user_id'));
  const reloadCount= sessionStorage.getItem('reloadCount');
  useEffect(() => {
    
      
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
    let data,userid;
    userid = localStorage.getItem('user_id');
    
    console.log(userid)
    
    axios.get(`http://localhost:8000/getUserTrackRunning/?userid=${userid}`)
      .then(res=>{
        data = res.data;
        console.log(data)
        
        setRunningTrackContent(
          data
        );
    console.log(running_track_content)

        
        
      })
      .catch(err=>{})
      axios.get(`http://localhost:8000/getUserTrackCompleted/?userid=${userid}`)
      .then(res=>{
        data = res.data;
        console.log(data)
        
        setCompletedTrackContent(
          data
        );
    console.log(completed_track_content)
    //show notification
    let username;
    username = localStorage.getItem('user_name');
    notification.open({
      key,
      message: `Hello ${username}`,
      description: 'WELCOME TO THE Elearners Family.',
    });
  
    setTimeout(() => {
      notification.open({
        key,
        message: `Hello ${username}`,
        description: 'WELCOME TO THE Elearners Family.',
      });
    }, 2000);

        
        
      })
      .catch(err=>{})
  }, []);
  

  // let TrackName = TRACKS[trackid].name;
  // let TrackDes = TRACKS[trackid].des;
  // let img = TRACKS[trackid].image;
  // console.log({ img });
  const Progress = ({ done }) => {
    const [style, setStyle] = React.useState({});
    const [backStyle, setBackStyle] = React.useState({});

    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };

      const bnewStyle = {
        opacity: 0,
      };

      const nbewStyle2 = {
        opacity: 1,
      };

      setStyle(newStyle);

      if (done <= 1) {
        setBackStyle(bnewStyle);
      } else {
        setBackStyle(nbewStyle2);
      }
    }, 200);

    return (
      <div className="progress-back-course" style={backStyle}>
        <div className="progress-done-course" style={style}></div>
      </div>
    );
  };

  function RunningCard() {
    console.log(running_track_content)
    
    // setRunningTrack(running_track_content)
    // console.log(runningTrack)
    return (
      <div className="courseRecom-container">
        <div className="courseRecom-header">Running Tracks</div>

        <div className="courseRecom-card-container">
          {running_track_content.running_tracks.map((out) => (
            <div className="courseRecomCard">
              <div className="CourseRecom-topText">{out.title}</div>
              <div className="CourseRecom-title">{out.des}</div>
              <div className="CourseRecom-bottomText">School Level</div>
              <div className="courseRecom-btn">
                <a href="#" className="btn-right-mi">
                  Visit Track
                </a>
              </div>
              <div className="progressRow-row">
                <Progress done={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function SuggestionCard() {
    return (
      <div className="Suggestion-container">
        <div className="Suggestion-Left">
          <div className="suggestion-header">
            We thought you might be interested to explore
          </div>
          <div className="Suggestion-title">Animation in Web-Developement</div>
          <div className="Suggestion-desc">
            {" "}
            E-learners makes learning engaging & effective by leveraging deep
            pedagogy & <br></br>
            cutting edge technology. With offerings ranging from adaptive
            self-learning <br></br>
            courses on apps & web to personalised 1-on-1 classes with expert
            teachers <br></br>
            for ages 4-18+, we have programs for every learner.
          </div>
          <div className="Suggestion-footer">
            Suggestion based on your achieved attributes
          </div>
        </div>

        <div className="Suggestion-right">
          <div className="tutorrialsCard">
            <div className="courseRecomCard">
              <img
                className="card_image"
                src={require("../assets/Home/profilephoto.jpg")}
              ></img>
              <div className="CourseRecom-topText"></div>
              <div className="courseRecom-btn">
                <a href="#" className="playbtn">
                  <img src={require("../assets/card/playbtn.jpg")}></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CompletedCard() {
    return (
      <div className="courseRecom-container">
        <div className="courseRecom-header">Completed Tracks</div>

        <div className="courseRecom-card-container">
          {completed_track_content.completed_tracks.map((out) => (
            <div className="courseRecomCard">
              <div className="CourseRecom-topText">{out.title}</div>
              <div className="CourseRecom-title">{out.des}</div>
              <div className="CourseRecom-bottomText">School Level</div>
              <div className="courseRecom-btn">
                <a href="#" className="btn-right-mi">
                  Visit Track
                </a>
              </div>
              <div className="progressRow-row">
                <Progress done={0} />
              </div>
            </div>
          ))}
        </div>
      </div>
      //   <div className="card-container">
      //     <div className="recom-header">
      //         Completed Course
      //     </div>
      //     <div className="row">
      //         {completed_course}
      //     </div>

      //   </div>
    );
  }
  return (
    <div className="dashboard-container">
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
          <div className="cousreSidebarMenuItem-selected">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Progress
          </div>
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Profile
          </div>
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Attributes
          </div>
        </div>
      </div>

      <div className="dashboardContent">
        <div>
          <SuggestionCard />
        </div>
        <div className="dashboardSplitter"></div>

        <div>
          <CompletedCard />
        </div>

        <div className="dashboardSplitter-normal"></div>

        <div>
          <RunningCard />
        </div>
        {/* <div>
            <CourseListEnrolled />
          </div>
          <div>
            <CourseListNotEnrolled/>
          </div> */}
      </div>
      {/* <div> 
        <RenderCompletedItem/>
      </div> */}
    </div>
  );
}
