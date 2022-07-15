import React from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import "../styles/CareerTracks.css";
import { TRACKS } from "../shared/tracks";
import "../styles/Course.css";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { useState, useEffect, useRef } from "react";
function RenderCompletedItem ({course}) {
    console.log(course.image);
    return (
        <div className="card 1">
            <div className="imgg">
                <img
                src={''+course.image}
                alt="no internet connection"
                />
            </div>

            <div className="card_title title-black">
                <p>{course.name}</p>
            </div>
        </div>
    );
}
export default function UserDashboard(props) {
    const { trackid } = useParams();

    let TrackName = TRACKS[trackid].name;
    let TrackDes = TRACKS[trackid].des;
    let img = TRACKS[trackid].image;
    console.log({img});
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
    
          if(done<=1){
            setBackStyle(bnewStyle);
          }
          else{
            setBackStyle(nbewStyle2);
          }
        }, 200);
    
        return (
          <div className="progress-back-course" style={backStyle}>
            <div className="progress-done-course" style={style}></div>
          </div>
        );
      };
    
    function RunningCard(){
        
        return (
            <div className="courseRecom-container">
                <div className="courseRecom-header">Running Tracks</div>

                <div className="courseRecom-card-container">
                {props.running.map((out) => (
                    <div className="courseRecomCard">
                    <div className="CourseRecom-topText">{out.header}</div>
                    <div className="CourseRecom-title">{out.title}</div>
                    <div className="CourseRecom-bottomText">{out.type}</div>
                    <div className="courseRecom-btn">
                    <a href="#" className="btn-right-mi">
                        Visit Track
                    </a>
                    </div>
                    <div className="progressRow-row">
                        <Progress done={100} />
                    </div>
                    </div>
                ))}
                </div>
            </div>
          );

    }
      function CompletedCard() { 
        return (
            <div className="courseRecom-container">
                <div className="courseRecom-header">Completed Tracks</div>

                <div className="courseRecom-card-container">
                {props.completed.map((out) => (
                    <div className="courseRecomCard">
                    <div className="CourseRecom-topText">{out.header}</div>
                    <div className="CourseRecom-title">{out.title}</div>
                    <div className="CourseRecom-bottomText">{out.type}</div>
                    <div className="courseRecom-btn">
                    <a href="#" className="btn-right-mi">
                        Visit Track
                    </a>
                    </div>
                    <div className="progressRow-row">
                        <Progress done={100} />
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
        <div className="CT-container">
          <div className="tracksProfile-container">
            <div className="tracksProfile-parent">
              <div className="tracksProfile-details">
                <div className="tracksProfile-details-name">
                  <span className="primary-text">
                    {" "}
                    <span className="highlighted-text">Running Track</span>
                  </span>
                </div>
                <div className="tracksProfile-details-role">
                  <span className="primary-text">
                    {" "}
                    <span className="tracksProfile-role-tagline">{TrackName}</span>
                  </span>
                </div>
                <div className="tracksProfile-options">
                  <button className="btn highlighted-btn">
                    {""}
                    Continue
                    {""}
                  </button>
                </div>
              </div>
    
              <div className="tracksProfile-picture">
              <div className="tracksProfile-picture-background" >
              </div>
              </div>
            </div>
          </div>
          
          <div className="courseContent">
            <CompletedCard />
          </div>
          <div className="courseContent">
            <RunningCard />
          </div>
          {/* <div>
            <CourseListEnrolled />
          </div>
          <div>
            <CourseListNotEnrolled/>
          </div> */}
        </div>
      );

}