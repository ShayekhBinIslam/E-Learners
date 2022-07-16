import React, {useState} from "react";
import ReactPlayer from "react-player"

export default function Course() {
  const [played, setPlayed] = useState(0);
  console.log(played)
  return (
    <div>
      <ReactPlayer 
        // onProgress={}
        controls
        url='https://www.youtube.com/watch?v=9nkR2LLPiYo'
        onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
          console.log(progress)
        }}
      />
    </div>
  );
}