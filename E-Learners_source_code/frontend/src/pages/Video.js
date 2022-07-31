import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player"
import axios from 'axios'
import { OutlinedInput } from "@material-ui/core";

export default function Course() {
  const [played, setPlayed] = useState(0);
  const [video, setVideo] = useState("");
  console.log(played)

  useEffect ( () => {
    let data;
    axios.get('http://localhost:8000/get_video/')
      .then(res=>{
        data = res.data;
        // this.setState({
        //   details: data
        // });
        console.log(data[0].link);
        console.log(window.location.pathname)
        setVideo(data[0].link)
      })
      .catch(err=>{})
  });

  return (
    // console.log(process.cwd())
    // video = "http://localhost:8000/media/" + video
    
    <div>
      <ReactPlayer 
        // onProgress={}
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
      />

    </div>
  );
}