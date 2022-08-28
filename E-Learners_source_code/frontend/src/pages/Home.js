import React from 'react'

import '../styles/home.css'

import Profile from '../HomeContainer/Home/Profile/Profile';
import Footer from '../HomeContainer/Home/Footer/Footer';
import Card from '../components/Card';
import RecommendationQuiz from '../components/RecommendationQuiz';
import HomeFooter from '../HomeContainer/Footer/HomeFooter';
import { useEffect } from 'react';
// import { Redirect } from 'react-router';
import { Navigate } from 'react-router-dom';

function Home(){
    const reloadCount= sessionStorage.getItem('reloadCount');
  useEffect(() => {
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);
  // return <div className='home-container'>
  //       <Profile/>
  //       <Footer/>
  //       <Card/>
  //       <RecommendationQuiz/>
  //       <HomeFooter/>
  //   </div>;
    if(!localStorage.getItem('user_id')){
    return <div className='home-container'>
        <Profile/>
        <Footer/>
        <Card/>
        <RecommendationQuiz/>
        <HomeFooter/>
    </div>;
    }
    else {
      return(
      <Navigate to={"/UserDashboard/".concat(localStorage.getItem('user_id'))} replace={true} />)

      // <Navigate to={"/UserDashboard/".concat(localStorage.getItem('user_id'))}/>
     }
     
}

export default Home;
