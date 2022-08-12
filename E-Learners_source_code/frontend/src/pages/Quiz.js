import React from "react";
import "../styles/Practice.css";
import "../styles/Quiz.css";

import { ReactComponent as ArrowIcon } from "../icons/caret.svg";
import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

let globalactiveMode = 1;

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

export default function Quiz() {
  const [activeMode, setActiveMode] = useState(globalactiveMode);
  const [Scores, setScores] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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
                <DropdownMenu list={courses}></DropdownMenu>
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
      <div className="QuizcourseContent">
        <QuizContent />
        <QuizEndContent />
        {activeMode===3?<QuizResultContent />:null}
      </div>
    </div>
  );

  function QuizContent() {
    const [currQues, setCurrQues] = useState(0);
    const [quizscore, setQuizScore] = useState(0);

    var questionsStatus = [];
    var textAreaAnswer = "";

    const [questions, setQuestions] = useState([
      {
        id: 0,
        question: "",
        qOptions: [],
        qAnswers: [],
      },
    ]);

    const [quizContent, setQuizContent] = useState({
      name: "name",
      questions: [
        {
          id: 0,
          question: "",
          qOptions: [],
          qAnswers: [],
        },
      ],
    });

    useEffect(() => {
      let data;
      localStorage.setItem("quizid", "1");
      localStorage.setItem("userid", "1");
      console.log(localStorage.getItem("trackid"));
      var quizid = localStorage.getItem("quizid");
      axios
        .get(`http://localhost:8000/getQuiz/?quizid=${quizid}`)
        .then((res) => {
          data = res.data;
          setQuizContent(data);
        })
        .catch((err) => {});

      // setQuizContent(qqq);
      setQuestions(quizContent.questions);

      var length = quizContent.questions.length;
      questionsStatus = new Array(length);
      for (var i = 0; i < length; i++) {
        questionsStatus.push("NA");
      }
    }, [JSON.stringify(quizContent)]);

    const [selected, setSelected] = useState(-1);

    const handleSkip = () => {
      questionsStatus[currQues] = "NA";

      axios({
        method: "post",
        url: "http://localhost:8000/saveQuestionStatus/",
        data: {
          user: localStorage.getItem("userid"),
          question: questions[currQues].id,
          status: questionsStatus[currQues],
        },
      })
        .then(function (response) {
          updateQuestionPage();
        })
        .catch(function (response) {
          console.log(response);
        });
    };

    const handleSubmit = () => {
      if (questions[currQues].qOptions.length === 0) {
        console.log(textAreaAnswer);
        if (quizContent.questions[currQues].qAnswers[0] === textAreaAnswer) {
          // questionsStatus[currQues] = "RT";
          questionsStatus[currQues] = textAreaAnswer;
          setQuizScore(quizscore + 1);
          console.log("Right milseeeee");
          console.log("quizscore", quizscore);
        } else {
          // questionsStatus[currQues] = "WG";
          questionsStatus[currQues] = textAreaAnswer;
        }
      } else if (selected === -1) {
        // questionsStatus[currQues] = "NA";
        questionsStatus[currQues] = "NA";
      } else if (
        quizContent.questions[currQues].qAnswers[0] ===
        quizContent.questions[currQues].qOptions[selected]
      ) {
        // questionsStatus[currQues] = "RT";
        questionsStatus[currQues] =
          quizContent.questions[currQues].qOptions[selected];
        setQuizScore(quizscore + 1);
        console.log("Right milse");
        console.log("quizscore", quizscore);
      } else {
        // questionsStatus[currQues] = "WG";
        questionsStatus[currQues] =
          quizContent.questions[currQues].qOptions[selected];
      }

      axios({
        method: "post",
        url: "http://localhost:8000/saveQuestionStatus/",
        data: {
          user: localStorage.getItem("userid"),
          question: questions[currQues].id,
          status: questionsStatus[currQues],
        },
      })
        .then(function (response) {
          updateQuestionPage();
        })
        .catch(function (response) {
          console.log(response);
        });
    };

    function updateQuestionPage() {
      if (currQues === quizContent.questions.length - 1) {
        setCurrQues(0);
        setSelected(-1);
        setScores(quizscore);
        setQuizScore(0);
        var length = quizContent.questions.length;
        setTotalQuestions(length);

        setActiveMode(2);
      } else {
        console.log("next");
        setSelected(-1);
        setCurrQues(currQues + 1);
      }
    }

    const handleSelect = (i) => {
      if (selected === i) {
        return "QuizItemOptionItem-select";
      } else {
        return "QuizItemOptionItem";
      }
    };

    const handleSelectOrder = (i) => {
      if (selected === i) {
        return "QuizItemOptionItemOrder-select";
      } else {
        return "QuizItemOptionItemOrder";
      }
    };

    const handleCheck = (i) => {
      setSelected(i);
    };

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

    if (activeMode === 1) {
      return (
        <div className="QuizItemContainer">
          <div className="QuizItemHeader">
            <div className="QuizItemHeaderTitle">
              {"Question "
                .concat(currQues + 1)
                .concat("/")
                .concat(questions.length)}
            </div>
            <Progress
              done={JSON.stringify(
                Math.round((currQues * 100) / questions.length)
              )}
            />
          </div>
          <div className="QuizItemQA">
            <div className="QuizItemQuestion">
              <div className="QuizItemQuestionImg"> </div>
              <div className="QuizItemQuestionText">
                {questions[currQues].question}
              </div>
            </div>
            <div className="QuizItemOptionsContainer">
              <div className="QuizItemOptions">
                {questions[currQues].qOptions.length > 0 ? (
                  <div>
                    {questions[currQues].qOptions.map((option, index) => (
                      <div
                        className={`${handleSelect(index)}`}
                        key={index}
                        onClick={() => handleCheck(index)}
                      >
                        <div className={`${handleSelectOrder(index)}`}>
                          {index + 1}
                        </div>
                        <div className="QuizItemOptionItemText">{option}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="QuizItemOptionItemBox">
                    <textarea
                      className="QuizItemOptionItemTextArea"
                      onChange={(e) => {
                        textAreaAnswer = e.target.value;
                      }}
                      placeholder="Enter your answer here"
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="QuizItemButton">
                <button className="QuizBtnSkip" onClick={() => handleSkip()}>
                  Skip
                </button>
                <button
                  className="QuizBtnSubmit"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function QuizEndContent() {
    const handleRetake = () => {
      setActiveMode(1);
      setScores(0);
    };

    const handleBack = () => {};

    const handleResult = () => {
      setActiveMode(3);
      setScores(0);
    };

    if (activeMode === 2) {
      return (
        <div>
          <div className="QuizEndContainerTop"></div>
          <div className="QuizEndContainer">
            <div className="QuizEndHeader">
              <div className="QuizEndHeaderTitle">
                {"You have completed the quiz"}
              </div>
              <div className="QuizEndHeaderScore">
                {"Your score is "
                  .concat(Scores)
                  .concat("/")
                  .concat(totalQuestions)}
              </div>
            </div>
            <div className="QuizEndButton">
              <button className="QuizBtnResult" onClick={() => handleResult()}>
                Show Result
              </button>
              <button className="QuizBtnRetake" onClick={() => handleRetake()}>
                Retake
              </button>
              <button className="QuizBtnBack" onClick={() => handleBack()}>
                Back
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  function QuizResultContent() {
    const [currQues, setCurrQues] = useState(0);
    const [quizscore, setQuizScore] = useState(0);

    var textAreaAnswer = "";

    const [quizResultContent, setQuizResultContent] = useState({
      quizContent: {name: "name",
      questions: [
        {
          question: "",
          qOptions: [],
          qAnswers: [],
        },
      ],},
      status: [[
        {
          question: 0,
          status: "answer",
        },
      ],]
    });

    const [quizStatus, setQuizStatus] = useState([[
      {
        question: 0,
        status: "answer",
      },
    ],]);

    const [questions, setQuestions] = useState([
      {
        question: "",
        qOptions: [],
        qAnswers: [],
      },
    ]);

    const [quizContent, setQuizContent] = useState({
      
      name: "name",
      
      questions: [
        {
          question: "",
          qOptions: [],
          qAnswers: [],
        },
      ],
    });

    useEffect(() => {
      let data;
      localStorage.setItem("quizid", "1");
      localStorage.setItem("userid", "1");
      console.log(localStorage.getItem("trackid"));
      var quizid = localStorage.getItem("quizid");

      axios
        .get(`http://localhost:8000/getQuizStatus/?quizid=${quizid}&userid=${localStorage.getItem("userid")}`)
        .then((res) => {
          data = res.data;
          setQuizResultContent(data);
        })
        .catch((err) => {});

        setQuizContent(quizResultContent.quizContent);
        setQuestions(quizContent.questions);
        setQuizStatus(quizResultContent.status);

        console.log(quizResultContent);

    }, [JSON.stringify(quizResultContent)]);

    const handleNext = () => {
      if (currQues === quizContent.questions.length - 1) {
        setCurrQues(0);

        var length = quizContent.questions.length;
        setTotalQuestions(length);
        setActiveMode(2);
      } else {
        console.log("next");
        setCurrQues(currQues + 1);
      }
    };

    const handleSelect = (i) => {
      if (quizResultContent.status[currQues][0].status === quizResultContent.quizContent.questions[currQues].qOptions[i] 
        && quizResultContent.quizContent.questions[currQues].qOptions[i] === quizResultContent.quizContent.questions[currQues].qAnswers[0]) {
        return "QuizItemOptionItem-right";
      }
      else if(quizResultContent.status[currQues][0].status === quizResultContent.quizContent.questions[currQues].qOptions[i] 
        && quizResultContent.quizContent.questions[currQues].qOptions[i] !== quizResultContent.quizContent.questions[currQues].qAnswers[0]){
        return "QuizItemOptionItem-wrong";
      }    
      else if (quizStatus[currQues].status === "NA" 
      && quizResultContent.quizContent.questions[currQues].qOptions[i] === quizResultContent.quizContent.questions[currQues].qAnswers[0]) {
        return "QuizItemOptionItem-wrong";
      } else if(quizResultContent.quizContent.questions[currQues].qOptions[i] === quizResultContent.quizContent.questions[currQues].qAnswers[0]){
        return "QuizItemOptionItem-right";
      }
      else{
        return "QuizItemOptionItem";
      }
    };

    const handleSelectOrder = (i) => {
      if (quizResultContent.status[currQues][0].status === quizResultContent.quizContent.questions[currQues].qOptions[i] 
        && quizResultContent.quizContent.questions[currQues].qOptions[i] === quizResultContent.quizContent.questions[currQues].qAnswers[0]) {
        return "QuizItemOptionItemOrder-right";
      }
      else if(quizResultContent.status[currQues][0].status === quizResultContent.quizContent.questions[currQues].qOptions[i] 
        && quizResultContent.quizContent.questions[currQues].qOptions[i] !== quizResultContent.quizContent.questions[currQues].qAnswers[0]){
        return "QuizItemOptionItemOrder-wrong";
      }    
      else if (quizStatus[currQues].status === "NA" 
      && quizResultContent.quizContent.questions[currQues].qOptions[i] === quizResultContent.quizContent.questions[currQues].qAnswers[0]) {
        return "QuizItemOptionItemOrder-wrong";
      } else if(quizResultContent.quizContent.questions[currQues].qOptions[i] === quizResultContent.quizContent.questions[currQues].qAnswers[0]){
        return "QuizItemOptionItemOrder-right";
      }
      else{
        return "QuizItemOptionItemOrder";
      }
    };

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

    if (activeMode === 3) {
      return (
        <div className="QuizItemContainer">
          <div className="QuizItemHeader">
            <div className="QuizItemHeaderTitle">
              {"Question "
                .concat(currQues + 1)
                .concat("/")
                .concat(quizResultContent.quizContent.questions.length)}
            </div>
            <Progress
              done={JSON.stringify(
                Math.round((currQues * 100) / quizResultContent.quizContent.questions.length)
              )}
            />
          </div>
          <div className="QuizItemQA">
            <div className="QuizItemQuestion">
              <div className="QuizItemQuestionImg"> </div>
              <div className="QuizItemQuestionText">
                {quizResultContent.quizContent.questions[currQues].question}
              </div>
            </div>
            <div className="QuizItemOptionsContainer">
              <div className="QuizItemOptions">
                {quizResultContent.quizContent.questions[currQues].qOptions.length > 0 ? (
                  <div>
                    {quizResultContent.quizContent.questions[currQues].qOptions.map((option, index) => (
                      <div
                        className={`${handleSelect(index)}`}
                        key={index}
                        // onClick={() => handleCheck(index)}
                      >
                        <div className={`${handleSelectOrder(index)}`}>
                          {index + 1}
                        </div>
                        <div className="QuizItemOptionItemText">{option}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="QuizItemOptionItemBox">
                    <textarea
                      className="QuizItemOptionItemTextArea"
                      onChange={(e) => {
                        textAreaAnswer = e.target.value;
                      }}
                      placeholder="Enter your answer here"
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="QuizItemButton">
                <button className="QuizBtnSkip" onClick={() => handleNext()}>
                  Next
                </button>
              </div>
            </div>
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
}
