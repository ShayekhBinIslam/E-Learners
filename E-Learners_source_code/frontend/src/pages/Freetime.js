import { React, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "../styles/freetime.css";

export default function Freetime() {
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState(moment().format("00:00"));
  const [endTime, setEndTime] = useState(moment().format("00:00"));
  console.log(startDate)
  console.log(endDate)
  const [freeslot, setFreeSlot] = useState([{}]);


  useEffect(() => {
    let data
    axios.get(`http://localhost:8000/get_freeslot/?user_id=${localStorage.getItem('user_id')}`)
      .then(res=>{
        data = res.data;
        setFreeSlot(data);
        console.log(data)
      })

  },[JSON.stringify(freeslot)]);
  

  const addFreeslot = async () =>  {
    console.log(startDate)
    console.log(endDate)
    let formField = new FormData()
    formField.append('start_date', startDate)
    formField.append('end_date', endDate)
    // formField.append('start_time', startTime)
    // formField.append('end_time', endTime)
    formField.append('start_time', "00:00")
    formField.append('end_time', "00:00")
    
    formField.append('user_id', localStorage.getItem('user_id'))
    // formField.append('a', 'a');

    // console.log(JSON.stringify(formField))
    // console.log(formField.entries())

    for (var key of formField.entries())
    {
      console.log(key[0] + ', ' + key[1]);
    }

    var userid = localStorage.getItem('user_id')
    console.log(userid)
    let data;
    await axios({
      method: 'post',
      url:'http://localhost:8000/add_freeslot/',
      data: formField
    }).then(response=>{
      console.log(response.data);
     // history.push('/admins')
    })
  }

  return (
    <div>
      <div className="free_slots_list">
        <h3>Free Slots</h3>
        </div>
      {freeslot.map((out => 
      <div className="container">
        <div> {out.start_date} </div>
        <div> {out.end_date} </div>
        </div>
      ))}
      
      <h3> Add Freetime: </h3>
      <div className="form-group">
        {/* Inpute date */}
        <label className="start_date" for="start_date">Start</label>
        <input type="date" 
          name="start_date" 
          value={startDate}
          // onLoad={(e) => setStartDate(e.target.value)}
          onChange={(e) => setStartDate(e.target.value)}/>
        
        <label for="start_time"></label>
        <input type="time" 
          name="start_time" 
          value={startTime}
          // onLoad={(e) => setStartDate(e.target.value)}
          onChange={(e) => setStartTime(e.target.value)}/>

        <label className="start_date" for="end_date">End</label>
        <input type="date" 
          name="end_date"
          value={endDate}
          // onLoad={(e) => setStartDate(e.target.value)}
          onChange={(e) => setEndDate(e.target.value)}/>
        <label for="end_time"></label>
        <input type="time" 
          name="end_time" 
          value={endTime}
          // onLoad={(e) => setStartDate(e.target.value)}
          onChange={(e) => setEndTime(e.target.value)}/>

        <button type="submit" className="btn btn-primary" onClick={addFreeslot}>
          Add Free Slot
        </button>
      </div>
    </div>
  );
}
