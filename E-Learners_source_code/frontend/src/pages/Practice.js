import React from "react";
import "../styles/Practice.css";

import { ReactComponent as ArrowIcon } from "../icons/caret.svg";
import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

export default function Practice() {
  const [activeMode, setActiveMode] = useState(globalactiveMode);
  const [trackscontent, setTrackscontent] = useState([]);

  useEffect(() => {
    let data, trackid, userid;
    trackid = 1;
    trackid = localStorage.getItem("active_track_id");
    userid = localStorage.getItem("user_id");
    console.log(trackid);
    axios
      .get(`http://localhost:8000/getCourseList/?trackid=${trackid}&user_id=${localStorage.getItem('user_id')}`)
      .then((res) => {
        data = res.data;
        setTrackscontent(data);
      })
      .catch((err) => {});
  }, [JSON.stringify(trackscontent.courses)]);

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
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/icons/learn.webp")}></img>
            Learn
          </div>
          <div className="cousreSidebarMenuItem-selected">
            <img src={require("../assets/icons/practice.webp")}></img>
            Practice
          </div>
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/icons/challenge.png")}></img>
            Daily Challenge
          </div>
        </div>
      </div>
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

    function DailyChallengeTab() {
      function gotoChallenge() {
        // setActiveMode(2);
      }

      if (isEnrolled) {
        return (
          <div className="courselist-container">
            <div className="course-table-course">
              <div>
                <div>
                  <div className="progressRow">
                    <div className="table-row-course">
                      <div className="table-col">
                        <div className="completedTaskcircle-back">
                          <div className="completedTaskcircle">3/5</div>
                        </div>
                      </div>
                      <div className="table-col">
                        <div className="name">Daily Challenge</div>
                        <div className="des">Complete your today's tasks</div>
                      </div>
                      <div className="table-col"></div>
                      <div className="table-col"></div>

                      <div className="table-col">
                        <button className="btn-table" onClick={gotoChallenge}>
                          Continue
                        </button>
                      </div>
                    </div>
                    <div className="progressRow-row">
                      <Progress done={"50"} />
                    </div>
                  </div>
                </div>
              </div>
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
            <DailyChallengeTab />
          </div>

          <div>
            <PracticeMenu />
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

      for(var i=0; i<props.list.length; i++){
        if(props.list[i].id === id1){
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
                .concat("/mode/1")
              }
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
                .concat("/mode/1")
              }
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
                .concat("/mode/1")
              }
            >
              Explore
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  function PracticeMenu() {
    const [chapterList, setChapterList] = useState([]);
    const [chapterListForQuiz, setChapterListForQuiz] = useState([]);

    useEffect(() => {
      let data;
      let courseid = 1;
      localStorage.setItem("courseid", courseid);
      courseid = localStorage.getItem("courseid");
      console.log("course id", courseid);
      axios
        .get(
          `http://localhost:8000/getChapterListForQuiz/?courseid=${courseid}`
        )
        .then((res) => {
          data = res.data;
          setChapterListForQuiz(data);
          setChapterList(data.chapters);
          console.log("chapter list paisi", data);
          console.log(chapterList);
          console.log(chapterListForQuiz);
        })
        .catch((err) => {});
    }, [JSON.stringify(chapterList)]);

    return (
      <div className="practiceMenu-container">
        <div className="courseRecom-header">Practice</div>

        <div className="PracticeMenu-Easy">
          <div className="topbarWrapper">
            <div className="topbarLeft-container">
              <div className="topLeft">
                <span className="logo">
                  <p>
                    Beginner
                    Practices&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                </span>
              </div>

              <div className="tracksDropdown-container">
                <div className="tracksDropdown-menu">
                  <NavItem icon={<ArrowIcon />}>
                    <DropdownMenu list={chapterList} mode={"bp"} idList={chapterListForQuiz.quiz_BG}></DropdownMenu>
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="PracticeMenu-medium">
          <div className="topbarWrapper">
            <div className="topbarLeft-container">
              <div className="topLeft">
                <span className="logo">Intermediate Practices</span>
              </div>

              <div className="tracksDropdown-container">
                <div className="tracksDropdown-menu">
                  <NavItem icon={<ArrowIcon />}>
                    <DropdownMenu list={chapterList} mode={"ip"} idList={chapterListForQuiz.quiz_IM}></DropdownMenu>
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="PracticeMenu-Hard">
          <div className="topbarWrapper">
            <div className="topbarLeft-container">
              <div className="topLeft">
                <span className="logo">
                  <p>
                    Advance
                    Practices&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                </span>
              </div>

              <div className="tracksDropdown-container">
                <div className="tracksDropdown-menu">
                  <NavItem icon={<ArrowIcon />}>
                    <DropdownMenu list={chapterList} mode={"ap"} idList={chapterListForQuiz.quiz_AV}></DropdownMenu>
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
