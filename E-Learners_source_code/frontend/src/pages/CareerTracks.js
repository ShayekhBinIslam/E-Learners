import React from "react";
import { useParams } from "react-router-dom";
import Typical from "react-typical";
import "../index.css";
import "../styles/CareerTracks.css";

export default function CareerTracks() {
  function RecommendationCard() {
      return (
        <div className="card-container">
            <div className="recom-header">
                Recommnedation
            </div>
          <div className="cards-list">
            <div className="card 1">
              <div className="imgg">
                <img
                  src={require("../assets/card/web.png")}
                  alt="no internet connection"
                />
              </div>

              <div className="card_title title-black">
                <p>Web Dev</p>
              </div>
            </div>

            <div className="card 2">
              <div className="imgg">
                <img
                  src={require("../assets/card/math.png")}
                  alt="no internet connection"
                />
              </div>
              <div className="card_title title-black">
                <p>Programming</p>
              </div>
            </div>

            <div className="card 3">
              <div className="imgg">
                <img
                  src={require("../assets/card/design.png")}
                  alt="no internet connection"
                />
              </div>
              <div className="card_title title-black">
                <p>Design</p>
              </div>
            </div>

            <div className="card 4">
              <div className="imgg">
                <img
                  src={require("../assets/card/algo.png")}
                  alt="no internet connection"
                />
              </div>
              <div className="card_title title-black">
                <p>Algorithm</p>
              </div>
            </div>
          </div>
        </div>
      );
    
  }

  const course = [
    {
      id: 1,
      name: "HTML",
      des: "This is HTML Course",
      progress: "70",
    },
    {
      id: 2,
      name: "HTML",
      des: "This is HTML Course",
      progress: "30",
    },
    { id: 3, name: "HTML", des: "This is HTML Course", progress: "20" },
    { id: 4, name: "HTML", des: "This is HTML Course", progress: "0" },
  ];

  const Progress = ({ done }) => {
    const [style, setStyle] = React.useState({});

    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };

      setStyle(newStyle);
    }, 200);

    return (
      <div className="progress-back">
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
                      <div className="pg">
                        <Progress done={out.progress} />
                        </div>
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

  const tracks = [
    {
      id: 1,
      name: "Web Development",
      des: "This is Web Development Career Track",
    },
    {
      id: 2,
      name: "Competetive Programming",
      des: "This is Competetive Programming Career Track",
    },
    { id: 3, name: "Math", des: "This is Math Career Track" },
    { id: 4, name: "Design", des: "This is Desing Career Track" },
  ];

  let isEnrolled = true;

  const { trackid } = useParams();

  let TrackName = tracks[trackid].name;
  let TrackDes = tracks[trackid].des;

  let buttonName = "Start";
  if (isEnrolled) {
    buttonName = "Continue";
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
                {buttonName}
                {""}
              </button>
            </div>
          </div>

          <div className="tracksProfile-picture">
            <div className="tracksProfile-picture-background"></div>
          </div>
        </div>
      </div>
      <div>
        <RecommendationCard />
      </div>
      <div>
        <CourseListEnrolled />
      </div>
      <div>
        <CourseListNotEnrolled/>
      </div>
    </div>
  );
}
