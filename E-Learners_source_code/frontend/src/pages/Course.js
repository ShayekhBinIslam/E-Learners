import React from "react";

import "../styles/Course.css";

import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";
import "../index.css";
import "../styles/CareerTracks.css";

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

export default function Course() {
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
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Learn
          </div>
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Practice
          </div>
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Daily Challenge
          </div>
        </div>
      </div>
      {/* bodyContent */}
      <div className="courseContent">
        <CourseContent />
      </div>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
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

  function ChapterListEnrolled() {
    if (isEnrolled) {
      return (
        <div className="courselist-container">
          <div className="courseList-header-course">Chapters</div>
          <div className="course-table-course">
            {chapterList.map((out) => (
              <div>
                <div>
                  <div className="progressRow">
                    <div className="table-row-course">
                      <div className="table-col">
                        <div className="id">{out.id}</div>
                      </div>
                      <div className="table-col">
                        <div className="name">{out.name}</div>
                        <div className="des">{out.des}</div>
                      </div>
                      <div className="table-col"></div>
                      <div className="table-col"></div>
                      <div className="table-col"></div>
                      <div className="table-col"></div>

                      <div className="table-col">
                        <button className="btn-table">Enter</button>
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
