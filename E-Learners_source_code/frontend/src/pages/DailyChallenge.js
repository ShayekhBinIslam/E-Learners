import React from "react";
import "../styles/Practice.css";

import { ReactComponent as ArrowIcon } from "../icons/caret.svg";
import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Navigate } from 'react-router-dom';

import axios from "axios";

//mode = 1 for CourseContent
//mode = 2 for ChapterContent
//mode = 3 for tutorialsContent
let globalactiveMode = 1;

let activeChapterid = 1;

const firstTrack = "Frontend Basics";
const fistDes = "This is Frontend Basics Course";
const trackid = 1;

const trackname = "Web Development";
const coursename = "FrontEnd Basics";

export default function DailyChallenge() {
  const [activeMode, setActiveMode] = useState(globalactiveMode);
  const [trackscontent, setTrackscontent] = useState([]);

  const [isgotoDL, setisGotoDL] = useState(false);
  const [isgotoL, setisGotoL] = useState(false);

  useEffect(() => {
    let data, trackid, userid;
    trackid = 1;
    trackid = localStorage.getItem("active_track_id");
    userid = localStorage.getItem("user_id");
    console.log(trackid);
    axios
      .get(`http://localhost:8000/getCourseList/?trackid=${trackid}`)
      .then((res) => {
        data = res.data;
        setTrackscontent(data);
      })
      .catch((err) => {});
  }, [JSON.stringify(trackscontent.courses)]);

  function gotoDL(){
    setisGotoDL(true);
  }

  function gotoL(){
    setisGotoL(true);
  }

  return (
    <div className="practice-container">
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
                <DropdownMenu
                  list={trackscontent.courses}
                  mode={"cr"}
                ></DropdownMenu>
              </NavItem>
            </div>
          </div>
        </div>
        <div className="courseSidebarSplit"></div>
        <div className="courseSidebarMenu">
          <div className="cousreSidebarMenuItem" onClick={gotoL}>
            <img src={require("../assets/icons/learn.webp")}></img>
            Learn
          </div>
          <div className="cousreSidebarMenuItem" onClick={gotoDL}>
            <img src={require("../assets/icons/practice.webp")}></img>
            Practice
          </div>
          <div className="cousreSidebarMenuItem-selected">
            <img src={require("../assets/icons/challenge.png")}></img>
            Daily Challenge
          </div>
        </div>
      </div>
      { isgotoDL ? <Navigate to={`/CareerTracks/${localStorage.getItem("active_track_id")}/Course/${localStorage.getItem("courseid")}/practice`} replace={true} />: null}
      { isgotoL ? <Navigate to={`/CareerTracks/${localStorage.getItem("active_track_id")}/Course/${localStorage.getItem("courseid")}`} replace={true} />: null}
      
      <div className="courseContent">
        <PracticeContent />
      </div>
    </div>
  );

  function PracticeContent() {
    let isEnrolled = true;

    const { courseid } = useParams();

    // let CourseName = trackscontent.courses[courseid].name;
    // let CourseDes = trackscontent.courses[courseid].des;

    let buttonName = "Start";
    if (isEnrolled) {
      buttonName = "Continue";
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

    if (activeMode == 1) {
      return (
        <div className="">
          {/* <div>
            <DailyChallengeTab />
          </div> */}

          <div className="challenge-container">
            <TutorialsListEnrolled />
          </div>
        </div>
      );
    }
  }

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

  function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState("main");
    const [activeTrack, setActiveTrack] = useState(props.list[0].name);
    const [activeId, setActiveId] = useState(props.list[0].id);
    const [activeDes, setActiveDes] = useState(props.list[0].des);
    const [menuHeight, setMenuHeight] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
      if (props.list.length < 4) {
        setMenuHeight(4 * 50 + 50);
      } else {
        setMenuHeight(props.list.length * 50 + 50);
      }
    }, [JSON.stringify(trackscontent.courses.length)]);

    function setActiveDesName(id1, des1, name1) {
      setActiveId(id1);
      setActiveDes(des1);
      setActiveTrack(name1);

      for (var i = 0; i < props.list.length; i++) {
        if (props.list[i].id === id1) {
          setActiveIndex(i);
        }
      }
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
            {props.list.map((out) => (
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
          {props.mode === "cr" ? (
            <a
              className="btn-right-mi"
              href={"/CareerTracks/"
                .concat(trackid.toString())
                .concat("/Course/")
                .concat(activeId.toString())}
            >
              Explore
            </a>
          ) : null}

          {props.mode === "bp" ? (
            <a
              className="btn-right-mi"
              href={"/CareerTracks/"
                .concat(trackid.toString())
                .concat("/Course/")
                .concat(activeId.toString())
                .concat("/Practice/")
                .concat(props.idList[activeIndex][0].id.toString())
                .concat("/mode/1")}
            >
              Explore
            </a>
          ) : null}

          {props.mode === "ip" ? (
            <a
              className="btn-right-mi"
              href={"/CareerTracks/"
                .concat(trackid.toString())
                .concat("/Course/")
                .concat(activeId.toString())
                .concat("/Practice/")
                .concat(props.idList[activeIndex][0].id.toString())
                .concat("/mode/1")}
            >
              Explore
            </a>
          ) : null}

          {props.mode === "ap" ? (
            <a
              className="btn-right-mi"
              href={"/CareerTracks/"
                .concat(trackid.toString())
                .concat("/Course/")
                .concat(activeId.toString())
                .concat("/Practice/")
                .concat(props.idList[activeIndex][0].id.toString())
                .concat("/mode/1")}
            >
              Explore
            </a>
          ) : null}
        </div>
      </div>
    );
  }

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

    const [tasks_status, setTasksStatus] = useState("");
    const [tasks_progress, setTasksProgress] = useState("");

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

    useEffect(() => {
      let data;

      let courseid = 1;

      axios
        .get(
          `http://localhost:8000/getDailyChallengeList/?courseid=${courseid}&userid=${localStorage.getItem(
            "user_id"
          )}`
        )
        .then((res) => {
          data = res.data;
          //   setTutorials(data.tutorialsList);
          setPractices(data);
          console.log(data);
        })
        .catch((err) => {});

      var count_completed = 0;
      for (var i = 0; i < practices.length; i++) {
        if (practices[i].score >= 70) {
          count_completed++;
        }
      }

      setTasksStatus(
        count_completed.toString() + "/" + practices.length.toString()
      );
      setTasksProgress((count_completed / practices.length) * 100);
    }, [JSON.stringify(practices)]);

    var navigate = useNavigate();

    function gotoPracticeStart(id) {
      localStorage.setItem("quizid", id);

      localStorage.setItem("mode", 1);

      var path1 = window.location.href;
      var path2 = path1.slice(0, -15);
      console.log(path2);

      //navigate(path2);
      navigate(`/CareerTracks/${localStorage.getItem("active_track_id")}/Course/${localStorage.getItem("courseid")}/practice/${id}/mode/1`);
      // <Navigate to={`./practice/${id}/mode/1`} replace={true} />
    }

    function gotoPracticeResult(id) {
      localStorage.setItem("quizid", id);

      localStorage.setItem("mode", 3);
      navigate(`/CareerTracks/${localStorage.getItem("active_track_id")}/Course/${localStorage.getItem("courseid")}/practice/${id}/mode/3`);
      // <Navigate to={`./practice/${id}/mode/3`} replace={true} />
    }

    function gotoVideoPage(order) {
      localStorage.setItem("videoOrder", 1);
      navigate(`/Videos`);
      // console.log("video id", id);
    }

    return (
      <div className="tutorials-container2">
        <div className="courselist-container2">
          <div className="course-table-course">
            <div>
              <div>
              <div className="nothing">h</div>
                <div className="progressRow">
                  <div className="table-row-course">
                    <div className="table-col">
                      <div className="completedTaskcircle-back">
                        <div className="completedTaskcircle">
                          {tasks_status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="table-col">
                      <div className="name">Today's Challenge</div>
                      <div className="des">Complete your today's tasks</div>
                    </div>
                    <div className="table-col"></div>
                    <div className="table-col"></div>
                    <div className="table-col"></div>
                    <div className="table-col"></div>
                    <div className="table-col"></div>
                    <div className="table-col"></div>
                  </div>
                  <div className="progressRow-row">
                    <Progress done={tasks_progress} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tutorials-practice">
          <div className="inChapterpracticeList">
            <div className="courseRecom-header">
              Challenges ({practices.length})
            </div>
            <div className="course-table-course2">
              {practices.map((out, index) => (
                <div>
                  <div>
                    <div className="progressRow2-2">
                      <div className="table-row-course">
                        <div className="table-col">
                          {/* <div className="id">{out.id}</div> */}
                        </div>
                        <div className="table-col">
                          <div className="practiceListName">
                            {out.title}{" "}
                            {out.score > 0 ? <div>{out.score}%</div> : null}
                          </div>
                          <div className="practicelistbtncontainer">
                            {out.score === 0 ? (
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

                            {out.score === 0 ? null : (
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
                        <Progress done={JSON.stringify(out.score)} />
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
