import axios from 'axios'
import React, {useState} from "react";
import { Route } from 'react-router';

class Admins extends React.Component {
  // const [played, setPlayed] = useState(0);
  // console.log(played)
  componentDidMount() {
    let data;
    axios.get('http://localhost:8000/adminlist/')
      .then(res=>{
        data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err=>{})
  }
}