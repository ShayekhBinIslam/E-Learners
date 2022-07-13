import React from 'react'

import "./HomeFooter.css"

export default function HomeFooter() {
  return (
    <div className='homefooter-container'>
        <div className='logo'>
            E-Learners
        </div>
        <div className='Aboutus'>
            <h4>About Us</h4>
            <ul>Lab Project</ul>
            <ul>30%</ul>
        </div>
        <div className='Contactus'>
            <h4>Contact Us</h4>
            <ul>Phone</ul>
            <ul>Email</ul>
        </div>
    </div>
  )
}
