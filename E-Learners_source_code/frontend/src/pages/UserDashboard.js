import React from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import "../styles/CareerTracks.css";
import { TRACKS } from "../shared/tracks";
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
    
    function RunningCard(){
        const running_course = props.running.map((course) => {
            return (
                <div key={ course.id } className="cards-list">    
                    <RenderCompletedItem course={course} />         
                </div>
            );
        });
        return (
            <div className="card-container">
              <div className="recom-header">
                  Running Course
              </div>
              <div className="row">
                  {running_course}
              </div>
               
            </div>
          );

    }
      function CompletedCard() {
        const completed_course = props.completed.map((course) => {
            return (
                <div key={ course.id } className="cards-list">    
                    <RenderCompletedItem course={course} />         
                </div>
            );
        });
        
        return (
          <div className="card-container">
            <div className="recom-header">
                Completed Course
            </div>
            <div className="row">
                {completed_course}
            </div>
     
          </div>
        );
      
    }
    const Progress = ({ done }) => {
        const [style, setStyle] = React.useState({});
        const [backStyle, setBackStyle] = React.useState({});
    
    
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
          
          <div>
            <CompletedCard />
          </div>
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
      );

}