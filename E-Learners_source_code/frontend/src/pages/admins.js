import axios from 'axios'
import React from 'react'
import { useState } from 'react';

class Admins extends React.Component {
  state = { details: [], }

  // fetch = () => {
  //   const [todo, setTodo] = useState({})
  //       const fetchdata = async () => {
  //           const res = await axios.get('http://localhost:8000/adminlist/');
  //           setTodo(res.data);
  //       };
  //       useEffect(() => {
  //           fetchdata();
  //       }, [])

  // }

  
  componentDidMount(){
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

  render(){
    return (
      <div>
        <header>
          Data  generated from django
        </header>

        {this.state.details.map((output) =>(
          <div>
            <div>
              <h2>{output.employee}</h2>
              <h3>{output.department}</h3>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Admins;
