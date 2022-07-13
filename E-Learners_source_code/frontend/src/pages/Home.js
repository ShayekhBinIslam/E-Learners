import React from 'react'

import '../styles/home.css'

import Profile from '../HomeContainer/Home/Profile/Profile';
import Footer from '../HomeContainer/Home/Footer/Footer';
import Card from '../components/Card';
import RecommendationQuiz from '../components/RecommendationQuiz';
import HomeFooter from '../HomeContainer/Footer/HomeFooter';
function Home(){

    return <div className='home-container'>
        <Profile/>
        <Footer/>
        <Card/>
        <RecommendationQuiz/>
        <HomeFooter/>
    </div>;
    
  
}

export default Home;
