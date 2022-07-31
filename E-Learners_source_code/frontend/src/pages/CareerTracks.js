import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

import "../index.css";
import "../styles/CareerTracks.css";
import { TRACKS } from "../shared/tracks";

export default function CareerTracks() {

  const { trackid } = useParams();

  const [TrackName, setTrackName] = useState();
  const [TrackDes, setTrackDes] = useState();


  const [tracks, setTracks] = useState([]);

  function fechTracks(){
    let data;
    axios.get('http://localhost:8000/getTrackList/')
      .then(res=>{
        data = res.data;
        setTracks(
          data
        );
      })
      .catch(err=>{})

      console.log(tracks);

      tracks.forEach((out, i) => {
         if(out.id==trackid){
          setTrackName(out.name);
         }
        });
      
  }


  useEffect(() => {

    fechTracks();

  },[]);

  const course = [
    {
      id: 0,
      name: "FrontEnd Basics",
      des: "This is Web FrontEnd Basics Course",
      progress: "25",
      isRunning : true
    },
    {
      id: 1,
      name: "Frontend Advance",
      des: "This is Frontend Advance Course",
      progress: "75",
      isRunning : false
    },
    { id: 2, name: "React", des: "This is React Course",progress: "35",isRunning : false },
    { id: 3, name: "Angular", des: "This is Angular Course",progress: "0",isRunning : false },
  ];

  // const tracks = [
  //   {
  //     id: 1,
  //     name: "Web Development",
  //     des: "This is Web Development Career Track",
  //     isRunning : true
  //   },
  //   {
  //     id: 2,
  //     name: "Competetive Programming",
  //     des: "This is Competetive Programming Career Track",
  //     isRunning : false
  //   },
  //   { id: 3, name: "Math", des: "This is Math Career Track",isRunning : false },
  //   { id: 4, name: "Design", des: "This is Desing Career Track" , isRunning : false},
  // ];

  let isEnrolled = true;

<<<<<<< HEAD
  const { trackid } = useParams();
  // console.log(userid);
  console.log(trackid);

  let TrackName = tracks[trackid].name;
  let TrackDes = tracks[trackid].des;

=======
>>>>>>> f21f4d1d0d2a6f1fa2d31b1d4701f54557cc8d28
  let buttonName = "Start";
  if (isEnrolled) {
    buttonName = "Continue";
  }

  const recomList = [
    {
      id: 1,
      header: "Active Learning",
      title: "Card with HTML5",
      type: "Power Play",
      progress: "70",
      button: "continue",
    },
    {
      id: 2,
      header: "Recommendation",
      title: "Form with HTML5",
      type: "Power Play",
      progress: "0",
      button: "start",
    },
  ];


  function RecommendationCard() {

    const ProgressR = ({ done }) => {
      const [style, setStyle] = useState({});
      const [backStyle, setBackStyle] = useState({});
  
  
      setTimeout(() => {
        const newStyle = {
          opacity: 1,
          width: `${done}%`,
        };
  
        setStyle(newStyle);
        const bnewStyle = {
          opacity: 0,
          
        };
  
        const nbewStyle2 = {
          opacity: 1,
        };
  
        setStyle(newStyle);
  
        if(done<=1){
          setBackStyle(bnewStyle);
        }
        else{
          setBackStyle(nbewStyle2);
        }
      }, 200);
  
      return (
        <div className="progress-back-course" style={backStyle}>
          <div className="progress-done-course" style={style}>
            
          </div>
        </div>
      );
    };

    return (
      <div className="trackRecom-container">
        <div className="courseRecom-header">Recommneded for you</div>

        <div className="courseRecom-card-container">
          {recomList.map((out) => (
            <div className="courseRecomCard">
              <div className="CourseRecom-topText">{out.header}</div>
              <div className="CourseRecom-title">{out.title}</div>
              <div className="CourseRecom-bottomText">{out.type}</div>
              <div className="courseRecom-btn">
                <a href="#" className="btn-right-mi">
                  {out.button}
                </a>
              </div>
              <div className="progressRow-row">
                <ProgressR done={out.progress} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const Progress = ({ done }) => {
    const [style, setStyle] = useState({});
    const [backStyle, setBackStyle] = useState({});


    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };

      setStyle(newStyle);
      const bnewStyle = {
        opacity: 0,
        
      };

      const nbewStyle2 = {
        opacity: 1,
      };

      setStyle(newStyle);

      if(done<=1){
        setBackStyle(bnewStyle);
      }
      else{
        setBackStyle(nbewStyle2);
      }
    }, 200);

    return (
      <div className="progress-back" style={backStyle}>
        <div className="progress-done" style={style}>
          {done}%
        </div>
      </div>
    );
  };

  function CourseListEnrolled() {
    if (isEnrolled) {
      return (
        <div className="courselist-container">
            <div className="courseList-header">
                Courses
            </div>
          <div className="course-table">
            {course.map((out) => (
              <div>
                <div>
                  <div className="table-row">
                    {/* <div className="table-col">
                      <div className="id">{out.id+1}</div>
                    </div> */}
                    <div className="table-col">
                      <div className="name">{out.name}</div>
                      <div className="des">{out.des}</div>
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      <div className="pg">
                        <Progress done={out.progress} />
                        </div>
                    </div>
                    <div className="table-col">
                      <a href={"/CareerTracks/".concat(trackid.toString()).concat("/Course/").concat(out.id)} className="btn-table">
                        Enter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  const enroll = () => {

  }


  function CourseListNotEnrolled() {
    if (!isEnrolled) {
      return (
        <div className="courselist-container">
            <div className="courseList-header">
                Courses
            </div>
          <div className="course-table">
            {course.map((out) => (
              <div>
                <div>
                  <div className="table-row">
                    <div className="table-col">
                      <div className="id">{out.id}</div>
                    </div>
                    <div className="table-col">
                      <div className="name">{out.name}</div>
                      <div className="des">{out.des}</div>
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      
                    </div>
                    <div className="table-col">
                      <button className="btn-table">
                        Enter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="CT-container">
      <div className="tracksProfile-container">
        <div className="tracksProfile-parent">
          <div className="tracksProfile-details">
            <div className="tracksProfile-details-name">
              <span className="primary-text">
                {" "}
                <span className="highlighted-text">{TrackName}</span>
              </span>
            </div>
            <div className="tracksProfile-details-role">
              <span className="primary-text">
                {" "}
                <span className="tracksProfile-role-tagline">{TrackDes}</span>
              </span>
            </div>
            <div className="tracksProfile-options">
              {/* enroll in a track */}
              <button className="btn highlighted-btn" onClick={enroll}>
                {""}
                {buttonName}
                {""}
              </button>
            </div>
          </div>

          <div className="tracksProfile-picture">
            {/* <div className="tracksProfile-picture-background" style={{ 
              backgroundImage: `url(../assets/card/${TRACKS[trackid].image})` 
            }}>

            </div> */}
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
      </div>

      <div>
        <RecommendationCard />
      </div>
      
      <div className="track-course-list">
        <CourseListEnrolled />
      </div>
      <div className="track-course-list">
        <CourseListNotEnrolled/>
      </div>
    </div>
  );
}
