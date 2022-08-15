import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player"
import axios from 'axios'
import { OutlinedInput } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "../styles/video.css"

export default function Course() {
  const playerRef = React.useRef();
  const [played, setPlayed] = useState(0);
  const [video, setVideo] = useState("");
  const [videoNum, setVideoNum] = useState(0);
  const [tutorial, setTutorial] = useState();
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [chapter_title, setChapterTitle] = useState(" ");
  console.log(played)

  useEffect ( () => {
    const chapterid = 1;
    let data;
    axios.get(`http://localhost:8000/get_video/?chapterid=${chapterid}&videonum=${videoNum}`)
      .then(res=>{
        data = res.data;
        // this.setState({
        //   details: data
        // });
        console.log(data[0].link);
        console.log(window.location.pathname)
        setVideo(data[0].link)
        setTutorial(data[0].tutorial)
        setTitle(data[0].title)
        setDescription(data[0].description)
        setChapterTitle(data[0].chapter_title)
        // setVideoNum(data[0].order)
      })
      .catch(err=>{})
  }, [video, videoNum]);

  function onProgress(state) {
    // setPlayed(state.playedSeconds);
    // console.log(progress);
    console.log(state)
    // console.log("played: " + state.playedSeconds);
    var x = state.played * 100;
    x = Math.round(x);
    console.log(x)
    
    var userid = localStorage.getItem('user_id')
    console.log(userid)


    let data;
    axios.post('http://localhost:8000/save_video_progress/', {'user': userid, 'progress': x, 'tutorial': tutorial})
      .then(res=>{
        data = res.data;
        // this.setState({
        //   details: data
        // });
      })
      .catch(err=>{})


  }

  // https://stackoverflow.com/a/70146130  
  const [isReady, setIsReady] = React.useState(false);
  // const playerRef = React.useRef();

  const onReady = React.useCallback((timeToStart) => {
    if (!isReady) {
      // const timeToStart = 12.6;
      playerRef.current.seekTo(timeToStart, "seconds");
      setIsReady(true);
    }
  }, [isReady]);

  function nextVideo() 
  {
    console.log("Next video")
    setVideoNum(videoNum + 1)
  }

  function prevVideo(){
    if(videoNum > 1){
      setVideoNum(videoNum - 1)
    }
  }

  var navigate = useNavigate();

  function closeVideo()
  {
    navigate(`/CareerTracks/${localStorage.getItem("trackid")}/Course/${localStorage.getItem("courseid")}`)
    console.log("Close video")
  }

  return (
    // console.log(process.cwd())
    // video = "http://localhost:8000/media/" + video

    
    <div><div className="videoHeader">
    <div className="video-chapter">{chapter_title}
      </div>
      <button className="closeVideobtn" onClick={closeVideo}> Exit </button>
    </div>
    <div className="videoContainer">
      <div className="videPlayerSide">
      
    
      <div className="videoPlayer">

        <ReactPlayer 
          // onProgress={}
          ref={playerRef}
          controls={true}
          width="1100px"
          height="600px"
          // url='https://www.youtube.com/watch?v=9nkR2LLPiYo'
          // url='../../../backend/media/video/22/video_file.mp4'
          // url="http://localhost:8000/media/video/22/video_file.mp4"
          
          url={"http://localhost:8000/media/" + video}
          // url={video}
          
          onProgress={onProgress}
          onReady={() => onReady(1)}
        />

<div className="videobtn">
        <button className="prevVideobtn" onClick={prevVideo}> Previous </button>
        <button className="nextVideobtn" onClick={nextVideo}> Next </button>    

      </div>

      </div>

      

      <div className="video-details">
      <div className="videoTitle">{title}</div>
      <div className="videoDescription">{description}</div>
      </div>

      
      </div>

      <div className="VideoPlaylist-Side">
        <TutorialsListEnrolled/>
      </div>
    </div>
    </div>

  );


  




  function TutorialsListEnrolled() {
    const [tutorials, setTutorials] = useState([]);
    const [practices, setPractices] = useState([]);
    const [practiceStatus, setPracticeStatus] = useState([]);
    // console.log(localStorage.getItem('user_id'))
    // const { courseid } = useParams();
    const chapter_id = localStorage.getItem("chapter_id");
    const [gotoQuizMode1, setGotoQuizMode1] = useState(false);
    const [gotoQuizMode3, setGotoQuizMode3] = useState(false);

    useEffect(() => {
      
      let data;

      console.log("chapter_id", chapter_id);
      axios
        .get(
          `http://localhost:8000/getTutorialList/?chapterid=${chapter_id}&userid=${localStorage.getItem(
            "user_id"
          )}`
        )
        .then((res) => {
          data = res.data;
          setTutorials(data.tutorialsList);
          console.log(data);
        })
        .catch((err) => {});

        console.log("tutorialsListEnroled", tutorials);
    }, [
      JSON.stringify(tutorials),
    ]);

    var navigate = useNavigate();

    


    function gotoVideoPage(order){
      localStorage.setItem("videoOrder", 1);
      navigate(`/Videos`);
     // console.log("video id", id);
    }


    
    return (
        <div className="tutorials-container">
          <div className="courseRecom-header">
            Tutorials ({tutorials.length})
          </div>
          
          <div className="tutorials-practice">
          
            <div className="tutorials-grid">
            
              {tutorials.map((out) => (
                <div className="tutorrialsCard">
                  <div className="courseRecomCard">
                    <img
                      className="card_image"
                      // src={require("../assets/Home/profilephoto.jpg")}
                      src={"http://localhost:8000"+out.poster}
                    ></img>
                    <div className="CourseRecom-topText">{out.length}</div>
                    <div className="courseRecom-btn">
                      <button className="playbtn"
                      onClick={() => gotoVideoPage(out.order)}>
                        <img
                          src={require("../assets/card/playbtn.jpg")}
                        ></img>
                      </button>
                    </div>
                    {/* <div className="progressRow-row">
                      <Progress done={out.progress} />
                    </div> */}
                  </div>
                  <div className="tutorialsName">{out.title}</div>
                </div>
              ))}
            </div>
          
          </div>
        </div>
      );


      
    }
}
