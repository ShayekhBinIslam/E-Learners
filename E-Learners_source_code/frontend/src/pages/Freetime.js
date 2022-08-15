import React, { useState } from 'react';
import axios from "axios";
import moment from "moment";

export default function Freetime() {
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  console.log(startDate)
  console.log(endDate)

  const addFreeslot = async () =>  {
    console.log(startDate)
    console.log(endDate)
    let formField = new FormData()
    // formField.append('start_date', startDate)
    // formField.append('end_date', endDate)
    
    formField.append('user', localStorage.getItem('user_id'))

    console.log(JSON.stringify(formField))

    // var userid = localStorage.getItem('user_id')
    // console.log(userid)
    // let data;
    // axios.post('http://localhost:8000/add_freeslot/', {'user': userid})
    //   .then(res=>{
    //     data = res.data;
    //     // this.setState({
    //     //   details: data
    //     // });
    //   })
    //   .catch(err=>{})
  }

  return (
    <div>
      <h1> Enter Freetime: </h1>
      <div className="form-group">
        {/* Inpute date */}
        <label for="start_date">Start Date</label>
        <input type="date" 
          name="start_date" 
          value={startDate}
          // onLoad={(e) => setStartDate(e.target.value)}
          onChange={(e) => setStartDate(e.target.value)}/>

        <label for="end_date">End Date</label>
        <input type="date" 
          name="end_date"
          value={endDate}
          // onLoad={(e) => setStartDate(e.target.value)}
          onChange={(e) => setEndDate(e.target.value)}/>

        <button type="submit" className="btn btn-primary" onClick={addFreeslot}>
          Add Free Slot
        </button>
      </div>
    </div>
  );
}
