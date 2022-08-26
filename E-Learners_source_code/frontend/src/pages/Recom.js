import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Recom() {
  const [recomlist, setRecomlist] = useState([{}]);

  useEffect(() => {
    let data
    axios.get(`http://localhost:8000/get_attribute_recommendation/?user_id=${localStorage.getItem('user_id')}`)
      .then(res=>{
        data = res.data;
        setRecomlist(data);
        console.log(data)
      })

  },[JSON.stringify(recomlist)]);

  

}