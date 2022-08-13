import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player"
import axios from 'axios'
import { OutlinedInput } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Course() {
  const playerRef = React.useRef();
  const [played, setPlayed] = useState(0);
  const [video, setVideo] = useState("");
  const [videoNum, setVideoNum] = useState(0);
  const [tutorial, setTutorial] = useState();
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

  var navigate = useNavigate();

  function closeVideo()
  {
    navigate(`/CareerTracks/${localStorage.getItem("trackid")}/Course/${localStorage.getItem("courseid")}`)
    console.log("Close video")
  }

  return (
    // console.log(process.cwd())
    // video = "http://localhost:8000/media/" + video

    
    
    <div>
      <div>
        <button onClick={nextVideo}> Next </button>
      </div>
      <div>     
        <button onClick={closeVideo}> Exit </button>
      </div>

      <div>

        <ReactPlayer 
          // onProgress={}
          ref={playerRef}
          controls={true}
          // url='https://www.youtube.com/watch?v=9nkR2LLPiYo'
          // url='../../../backend/media/video/22/video_file.mp4'
          // url="http://localhost:8000/media/video/22/video_file.mp4"
          
          url={"http://localhost:8000/media/" + video}
          // url={video}
          
          onProgress={onProgress}
          onReady={() => onReady(1)}
        />

      </div>

    </div>
  );
}