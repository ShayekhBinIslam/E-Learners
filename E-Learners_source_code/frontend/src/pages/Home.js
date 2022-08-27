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
  

    if (localStorage.getItem('user_id'))
    {
      return (<Navigate to={"/UserDashboard/".concat(localStorage.getItem('user_id'))} />);
    }
    else 
    return (
    <div className='home-container'>
        <Profile/>
        <Footer/>
        <Card/>
        <RecommendationQuiz/>
        <HomeFooter/>
    </div>);
     
}

export default Home;
