import React from "react";

import "../styles/Course.css";

import { ReactComponent as ArrowIcon } from "../icons/caret.svg";
import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Navigate } from 'react-router-dom';

import axios from "axios";

import "../index.css";
import "../styles/CareerTracks.css";

//mode = 1 for CourseContent
//mode = 2 for ChapterContent
//mode = 3 for tutorialsContent
let globalactiveMode = 1;

let activeChapterid = 1;

const courses = [
  {
    id: 0,
    name: "FrontEnd Basics",
    des: "This is Web FrontEnd Basics Course",
  },
  {
    id: 1,
    name: "Frontend Advance",
    des: "This is Frontend Advance Course",
  },
  { id: 2, name: "React", des: "This is React Course" },
  { id: 3, name: "Angular", des: "This is Angular Course" },
];

const firstTrack = "Frontend Basics";
const fistDes = "This is Frontend Basics Course";
const trackid = 1;

const trackname = "Web Development";
const coursename = "FrontEnd Basics";

const chapterList = [
  {
    id: 1,
    name: "HTML",
    des: "This is HTML Chapter",
    progress: "70",
  },
  {
    id: 2,
    name: "CSS",
    des: "This is CSS Chapter",
    progress: "30",
  },
  {
    id: 3,
    name: "JavaScript",
    des: "This is JavaScript Chapter",
    progress: "20",
  },
];

const tutorialsList = [
  {
    id: 1,
    title: "Card with HTML5",
    progress: "70",
    length: "9 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
  {
    id: 2,
    title: "Form with HTML5",
    progress: "0",
    length: "19 mins",
  },
];

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

const recomChapterList = [
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
    header: "HTML",
    title: "Practice",
    type: "Test what you have learnt",
    progress: "0",
    button: "Practice Now",
  },
];

export default function Course() {
  const [activeMode, setActiveMode] = useState(globalactiveMode);
  const [isgotoPractice, setisGotoPractive] = useState(false);

  // const navigate = useNavigate();

  function gotoPractice() {
    // navigate("./practice");
    // <Navigate to={"./practice/"} replace={true} />
    setisGotoPractive(true);
  }

  return (
    <div className="courseContainer">
      <div className="courseSidebar">
        <div className="cousreSidebarTrack">
          <img src={require("../assets/Home/profilephoto.jpg")}></img>
          <div className="courseSidebarTrackText">
            <div className="courseSidebarTrackText1">Career Track</div>
            <div className="courseSidebarTrackText2">{trackname}</div>
          </div>
        </div>
        <div className="courseSidebarCourse">
          <div className="tracksDropdown-container">
            {coursename}
            <div className="tracksDropdown-menu">
              <NavItem icon={<ArrowIcon />}>
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </div>
          </div>
        </div>
        <div className="courseSidebarSplit"></div>
        <div className="courseSidebarMenu">
          <div className="cousreSidebarMenuItem-selected">
            <img src={require("../assets/icons/learn.webp")}></img>
            Learn
          </div>
          <div className="cousreSidebarMenuItem" onClick={gotoPractice}>
            <img src={require("../assets/icons/practice.webp")}></img>
            Practice
          </div>
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/icons/challenge.png")}></img>
            Daily Challenge
          </div>
        </div>
      </div>
      {/* bodyContent */}
      { isgotoPractice ? <Navigate to={"./practice"} replace={true} />: null}
      <div className="courseContent">
        <CourseContent />
        <ChapterContent />
      </div>
    </div>
  );



  function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>
        {open && props.children}
      </li>
    );
  }

  function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const [activeTrack, setActiveTrack] = useState(firstTrack);
    const [activeId, setActiveId] = useState(firstTrack);
    const [activeDes, setActiveDes] = useState(fistDes);
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      setMenuHeight(courses.length * 50 + 50);
    }, []);

    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

    function setActiveDesName(id1, des1, name1) {
      setActiveId(id1);
      setActiveDes(des1);
      setActiveTrack(name1);
    }

    function DropdownItem(props) {
      return (
        <a
          href="#"
          className="menu-item"
          onMouseEnter={() =>
            setActiveDesName(props.goToMenu, props.des, props.name)
          }
        >
          {props.children}
        </a>
      );
    }

    return (
      <div className="dropDown-container">
        <div
          className="dropdown-course"
          style={{ height: menuHeight }}
          ref={dropdownRef}
        >
          <div className="menu-course">
            {courses.map((out) => (
              <div>
                <div>
                  <DropdownItem goToMenu={out.id} name={out.name} des={out.des}>
                    {out.name}
                  </DropdownItem>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="menu-item-right-course">
          <h4>{activeTrack}</h4>
          <br></br>
          {activeDes}
          <a
            className="btn-right-mi"
            href={"/CareerTracks/"
              .concat(trackid.toString())
              .concat("/Course/")
              .concat(activeId.toString())}
          >
            Explore
          </a>
        </div>
      </div>
    );
  }

  function CourseContent() {
    let isEnrolled = true;

    const { courseid } = useParams();

    let CourseName = courses[courseid].name;
    let CourseDes = courses[courseid].des;

    let buttonName = "Start";
    if (isEnrolled) {
      buttonName = "Continue";
    }

    function RecommendationCard() {
      return (
        <div className="courseRecom-container">
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
                  <Progress done={out.progress} />
                </div>
              </div>
            ))}
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

    function ChapterListEnrolled() {
      var userCourse = {
        user: 1,
        course: 1,
        active_tutorial: 2,
        active_practice: 1,
      };

      function gotoChapter(chapter_id) {
        setActiveMode(2);
        axios({
          method: "post",
          url: "http://localhost:8000/saveUserCourse/",
          data: userCourse,
        })
          .then(function (response) {})
          .catch(function (response) {
            console.log(response);
          });

        localStorage.setItem("chapter_id", chapter_id);
        console.log("Chapter id: " + chapter_id);
      }

      const [chapters, setChapters] = useState([]);
      console.log(localStorage.getItem("user_id"));
      const { courseid } = useParams();

      useEffect(() => {
        // fechTracks();
        let data;
        // localStorage.setItem('trackid', '1')
        // let trackid = localStorage.getItem('trackid')
        // console.log("course id", localStorage.getItem('courseid'))

        // let courseid = "1"

        console.log("course id", courseid);
        axios
          .get(`http://localhost:8000/getChapterList/?courseid=${courseid}`)
          .then((res) => {
            data = res.data;
            setChapters(data);
            console.log(data);
          })
          .catch((err) => {});
      }, []);

      if (isEnrolled) {
        return (
          <div className="courselist-container">
            <div className="courseList-header-course">Chapters</div>
            <div className="course-table-course">
              {chapters.map((out) => (
                <div>
                  <div>
                    <div className="progressRow">
                      <div className="table-row-course">
                        <div className="table-col">
                          <div className="id">{out.id}</div>
                        </div>
                        <div className="table-col">
                          <div className="name">{out.title}</div>
                          <div className="des">{out.description}</div>
                        </div>
                        <div className="table-col"></div>
                        <div className="table-col"></div>
                        <div className="table-col"></div>
                        <div className="table-col"></div>

                        <div className="table-col">
                          <button
                            className="btn-table"
                            onClick={() => gotoChapter(out.id)}
                          >
                            Enter
                          </button>
                        </div>
                      </div>
                      <div className="progressRow-row">
                        <Progress done={out.progress} />
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

    if (activeMode == 1) {
      return (
        <div className="">
          <div>
            <RecommendationCard />
          </div>
          <div>
            <ChapterListEnrolled />
          </div>
        </div>
      );
    }
  }

  function ChapterContent() {
    let isEnrolled = true;

    let ChpaterName = chapterList[activeChapterid].name;
    let ChapterDes = courses[activeChapterid].des;

    let buttonName = "Start";
    if (isEnrolled) {
      buttonName = "Continue";
    }

    function goBackToCourseContent() {
      setActiveMode(1);
    }

    function RecommendationCard() {
      return (
        <div className="courseRecom-container">
          <div className="courseRecom-header">
            <button
              className="btn-right-mi-chapter"
              onClick={goBackToCourseContent}
            >
              {"<-"}
            </button>
            {ChpaterName}
          </div>

          <div className="courseRecom-card-container">
            {recomChapterList.map((out) => (
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
                  <Progress done={out.progress} />
                </div>
              </div>
            ))}
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

    function TutorialsListEnrolled() {
      const [tutorials, setTutorials] = useState([]);
      const { chapterid } = useParams();
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
            setPractices(data.PracticeList);
            setPracticeStatus(data.PracticeStatus);
            console.log(data);
          })
          .catch((err) => {});
      }, [
        JSON.stringify(tutorials),
        JSON.stringify(practices),
        JSON.stringify(practiceStatus),
      ]);

      var navigate = useNavigate();

      function gotoPracticeStart(id) {
        localStorage.setItem("quizid", id);
        
        localStorage.setItem("mode", 1);

        navigate(`./practice/${id}/mode/1`);
        // <Navigate to={`./practice/${id}/mode/1`} replace={true} />
       
      }

      function gotoPracticeResult(id) {
        localStorage.setItem("quizid", id);
        
        localStorage.setItem("mode", 3);
        navigate(`./practice/${id}/mode/3`);
        // <Navigate to={`./practice/${id}/mode/3`} replace={true} />
        
      }


      if (isEnrolled) {
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
                        src={require("../assets/Home/profilephoto.jpg")}
                      ></img>
                      <div className="CourseRecom-topText">{out.length}</div>
                      <div className="courseRecom-btn">
                        <a href="#" className="playbtn">
                          <img
                            src={require("../assets/card/playbtn.jpg")}
                          ></img>
                        </a>
                      </div>
                      <div className="progressRow-row">
                        <Progress done={out.progress} />
                      </div>
                    </div>
                    <div className="tutorialsName">{out.title}</div>
                  </div>
                ))}
              </div>
              <div className="inChapterpracticeList">
              <div className="courseRecom-header">
              Practices ({practices.length})
            </div>
                <div className="course-table-course2">
                
                  {practices.map((out, index) => (
                    <div>
                      <div>
                        <div className="progressRow2">
                          <div className="table-row-course">
                            <div className="table-col">
                              {/* <div className="id">{out.id}</div> */}
                            </div>
                            <div className="table-col">
                              <div className="practiceListName">
                                {out.title} {practiceStatus[index]>0?
                                (<div>{practiceStatus[index]}%</div>):null}
                              </div>
                              <div className="practicelistbtncontainer">
                                {practiceStatus[index] === 0 ? (
                                  <div className="table-col2">
                                    <button
                                      className="btn-table"
                                      onClick={() => gotoPracticeStart(out.id)}
                                    >
                                      Start
                                    </button>
                                  </div>
                                ) : (
                                  <div className="table-col2">
                                    <button
                                      className="btn-table"
                                      onClick={() => gotoPracticeStart(out.id)}
                                    >
                                      Retake
                                    </button>
                                  </div>
                                )}

                                {practiceStatus[index] === 0 ? null : (
                                  <div className="table-col2">
                                    <button
                                      className="btn-table"
                                      onClick={() => gotoPracticeResult(out.id)}
                                    >
                                      View Result
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="table-col"></div>
                          </div>
                          <div className="progressRow-row">
                            <Progress
                              done={JSON.stringify(practiceStatus[index])}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* { isgotoPractice ? <Navigate to={"./practice"} replace={true} />: null} */}
      
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    if (activeMode == 2) {
      return (
        <div className="">
          <div>
            <RecommendationCard />
          </div>
          <div>
            <TutorialsListEnrolled />
          </div>
        </div>
      );
    }
  }
}
