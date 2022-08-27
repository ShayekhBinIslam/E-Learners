import { React, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "../styles/freetime.css";
import { useNavigate } from "react-router-dom";

export default function Freetime() {
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(moment().format("00:00"));
  const [endTime, setEndTime] = useState(moment().format("00:00"));
  console.log(startDate);
  console.log(endDate);
  const [freeslot, setFreeSlot] = useState([{}]);

  useEffect(() => {
    let data;
    axios
      .get(
        `http://localhost:8000/get_freeslot/?user_id=${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((res) => {
        data = res.data;
        setFreeSlot(data);
        console.log(data);
      });
  }, [JSON.stringify(freeslot)]);

  const addFreeslot = async () => {
    console.log(startDate);
    console.log(endDate);
    let formField = new FormData();
    formField.append("start_date", startDate);
    formField.append("end_date", endDate);
    // formField.append('start_time', startTime)
    // formField.append('end_time', endTime)
    formField.append("start_time", "00:00");
    formField.append("end_time", "00:00");

    formField.append("user_id", localStorage.getItem("user_id"));
    // formField.append('a', 'a');

    // console.log(JSON.stringify(formField))
    // console.log(formField.entries())

    for (var key of formField.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    var userid = localStorage.getItem("user_id");
    console.log(userid);
    let data;
    await axios({
      method: "post",
      url: "http://localhost:8000/add_freeslot/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      // history.push('/admins')
    });
  };

  const navigate = useNavigate();

  const navToUserProfile = () => {
    // localStorage.setItem('user_name','');
    navigate("/UserProfile/");
  };

  return (
    <div>
      <div className="courseSidebar">
        <div className="cousreSidebarTrack">
          <img src={require("../assets/Home/profilephoto.jpg")}></img>
          <div className="courseSidebarTrackText">
            <div className="courseSidebarTrackText1">John</div>
            <div className="courseSidebarTrackText2">Good Morning</div>
          </div>
        </div>

        <div className="courseSidebarSplit"></div>
        <div className="courseSidebarMenu">
          <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Progress
          </div>
          <div
            className="cousreSidebarMenuItem"
            onClick={() => navToUserProfile()}
          >
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Profile
          </div>
          <div className="cousreSidebarMenuItem-selected" onClick={() => navToUserProfile()}>
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Free Time
          </div>
          {/* <div className="cousreSidebarMenuItem">
            <img src={require("../assets/Home/profilephoto.jpg")}></img>
            Attributes
          </div> */}
        </div>
      </div>

       <div className="freetime-Content"> 
        <div className="free_slots_list">
          <h3>Free Slots</h3>
        </div>
        <div className="free-time-container2">
          <div className="start-added"> Start date </div>
          <div className="end-added"> End Date </div>
        </div>
        {freeslot.map((out) => (
          <div className="free-time-container">
            <div className="start-added"> {out.start_date} </div>
            <div className="end-added"> {out.end_date} </div>
          </div>
        ))}

        <h3 className="add-ft"> Add Freetime: </h3>
        <div className="form-group">
          {/* Inpute date */}
          <div className="start-div-input">
            <label className="start_date" for="start_date">
              Start
            </label>
            <input
              className="date-input"
              type="date"
              name="start_date"
              value={startDate}
              // onLoad={(e) => setStartDate(e.target.value)}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label for="start_time"></label>
            <input
              className="date-input"
              type="time"
              name="start_time"
              value={startTime}
              // onLoad={(e) => setStartDate(e.target.value)}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="end-div-input">
            <label className="start_date" for="end_date">
              End
            </label>
            <input
              className="date-input"
              type="date"
              name="end_date"
              value={endDate}
              // onLoad={(e) => setStartDate(e.target.value)}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <label for="end_time"></label>
            <input
              className="date-input"
              type="time"
              name="end_time"
              value={endTime}
              // onLoad={(e) => setStartDate(e.target.value)}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <button className="date-input-btn" type="submit" onClick={addFreeslot}>
          Add Free Slot
        </button>
       </div>
    </div>
  );
}
