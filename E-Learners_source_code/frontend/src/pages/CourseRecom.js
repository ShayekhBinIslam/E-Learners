import { React, useEffect, useState } from "react";
import axios from "axios";

export default function CourseRecom() {
  const [recomlist, setRecomlist] = useState([{}]);

  useEffect(() => {
    let data
    axios.get(`http://localhost:8000/get_course_recommendation/?user_id=${localStorage.getItem('user_id')}&track_id=${localStorage.getItem('active_track_id')}&course_id=${localStorage.getItem('courseid')}`)
      .then(res=>{
        data = res.data;
        setRecomlist(data);
        console.log(data)
      })

  },[JSON.stringify(recomlist)]);

  

}