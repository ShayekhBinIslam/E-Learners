import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import ReactPlayer from "react-player"

import "../index.css";
import "../styles/CareerTracks.css";
import { TRACKS } from "../shared/tracks";

export default function CareerTracks() {

  const { trackid } = useParams();

  const [TrackName, setTrackName] = useState();
  const [TrackDes, setTrackDes] = useState();
  const [isEnrolled,setisEnrolled] = useState(false);


  const [tracks, setTracks] = useState([]);
  const [course, setCourse] = useState([]);
  const [trackscontent, setTrackContent] = useState({
    "name": "name",
    "des": "des",
    "video": "",
    "courses": []
  });

  // const [trackscontent, setTrackContent] = useState([{}]);

  function logResult() {
    return 2 + 2;
  }

  const [played, setPlayed] = useState(0);
  const [video, setVideo] = useState();
  
  console.log(played)
  const [recomlist, setRecomlist] = useState([{
    id: 1,
    header: "Active Learning",
    title: "Card with HTML5",
    type: "Power Play",
    progress: "70",
    button: "Continue",
  }]);


  useEffect(() => {
    let data,trackid,userid;
    trackid = localStorage.getItem('active_track_id')
    userid = localStorage.getItem('user_id')
    console.log(trackid)
    axios.get(`http://localhost:8000/getCourseList/?trackid=${trackid}&user_id=${localStorage.getItem('user_id')}`)
      .then(res=>{
        data = res.data;
        setTrackContent(
          data
        );
      })
      .catch(err=>{})
      setCourse(trackscontent.courses)
      setTrackName(trackscontent.name)
      setTrackDes(trackscontent.des)
      setVideo(trackscontent.video)
    //GET USERTRACKS
    axios.get(`http://localhost:8000/getUserTrackDetails/?trackid=${trackid}&userid=${userid}`)
      .then(res=>{
        
        data = res.data;
        setisEnrolled(data[0].isEnrolled)
        // setTrackContent(
        //   data
        // );
      })
      .catch(err=>{})
    
    // Get recommended courses
    axios.get(`http://localhost:8000/get_course_recommendation/?user_id=${localStorage.getItem('user_id')}&track_id=${localStorage.getItem('active_track_id')}&course_id=${localStorage.getItem('courseid')}`)
      .then(res=>{
        data = res.data;
        setRecomlist(data);
        console.log(data)
      })
      
      // setCourse(trackscontent.courses)
      // setTrackName(trackscontent.name)
      // setTrackDes(trackscontent.des)
      // setVideo(trackscontent.video)
    // let data;
    // axios.get('http://localhost:8000/get_video/')
    //   .then(res=>{
    //     data = res.data;
    //     // this.setState({
    //     //   details: data
    //     // });
    //     console.log(data[0].link);
    //     console.log(window.location.pathname)
    //     setVideo(data[0].link)
    //   })
    //   .catch(err=>{})

  }, [JSON.stringify(trackscontent), JSON.stringify(recomlist)]);

  // const course = [
  //   {
  //     id: 0,
  //     name: "FrontEnd Basics",
  //     des: "This is Web FrontEnd Basics Course",
  //     progress: "25",
  //     isRunning : true
  //   },
  //   {
  //     id: 1,
  //     name: "Frontend Advance",
  //     des: "This is Frontend Advance Course",
  //     progress: "75",
  //     isRunning : false
  //   },
  //   { id: 2, name: "React", des: "This is React Course",progress: "35",isRunning : false },
  //   { id: 3, name: "Angular", des: "This is Angular Course",progress: "0",isRunning : false },
  // ];

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

  // let isEnrolled = true;

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
      button: "Continue",
    },
    {
      id: 2,
      header: "Recommendation",
      title: "Form with HTML5",
      type: "Power Play",
      progress: "0",
      button: "Start",
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
          {recomlist.map((out) => (
            
            <div className="courseRecomCard">
              <div className="CourseRecom-topText">{out.header}</div>
              <div className="CourseRecom-title">{out.name}</div>
              {/* <div className="CourseRecom-bottomText">{out.type}</div> */}
              <div className="courseRecom-btn">
                <a  onClick={() => {localStorage.setItem('courseid', out.id); enroll_course(out.id)}}
                href={"/CareerTracks/".concat(out.track_id).concat("/Course/").concat(out.id)} className="btn-right-mi">
                  {out.button}
                </a>
              </div>
              <div className="progressRow-row">
                {/* <ProgressR done={out.progress} /> */}
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

  function enroll()
  {  
    let data;
    axios.post('http://localhost:8000/enroll_track/',
        {'user': localStorage.getItem('user_id'), 
        'track': trackid})
      .then(res=>{
        data = res.data;
        // this.setState({
        //   details: data
        // });
      })
      .catch(err=>{})

  }

  function CourseListEnrolled() {
    const set_courseid = (courseid) => {
      localStorage.setItem('courseid', courseid)
    };

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
                      
                        {out.isRunning ? 
                        <a onClick={() => set_courseid(out.id)} href={"/CareerTracks/".concat(trackid.toString()).concat("/Course/").concat(out.id)} className="btn-table">
                        Enter </a>
                        : 
                        <a onClick={() => {set_courseid(out.id); enroll_course(out.id)}} href={"/CareerTracks/".concat(trackid.toString()).concat("/Course/").concat(out.id)} className="btn-table">
                        Start </a>}
                        {/* Enter */}
                      
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
  const enroll_course = (course_id) => {
    let data;
    axios.post('http://localhost:8000/enroll_course/', 
        {'user': localStorage.getItem('user_id'), 
        'course': course_id, 'status': 'R'})
      .then(res=>{
        data = res.data;
        // this.setState({
        //   details: data
        // });
      })
      .catch(err=>{})
       
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
          {/* <div> */}
            {/* <div className="tracksProfile-picture-background" style={{ 
              backgroundImage: `url(../assets/card/${TRACKS[trackid].image})` 
            }}>

            </div> */}
            <div className="tutorrialsCard">
            <div className="courseRecomCard">

              {/* <img
                className="card_image"
                src={require("../assets/Home/profilephoto.jpg")}
              ></img> */}


              {/* <div className="CourseRecom-topText"></div> */}
              {/* <div className="courseRecom-btn"> */}
              <div>
                <a href="#" className="playbtn">
                  {/* <img src={require("../assets/card/playbtn.jpg")}></img> */}
                  {video? 
                  <ReactPlayer 
                    // onProgress={}
                    width="400px"
                    controls
                    // url='https://www.youtube.com/watch?v=9nkR2LLPiYo'
                    // url='../../../backend/media/video/22/video_file.mp4'
                    // url="http://localhost:8000/media/video/22/video_file.mp4"
                    
                    url={"http://localhost:8000/media/" + video}
                    // url={video}
                    
                    onProgress={(progress) => {
                      setPlayed(progress.playedSeconds);
                      // console.log(progress);
                    }}
                  /> : ""
                }
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
