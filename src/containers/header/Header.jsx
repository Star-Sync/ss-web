import React from 'react'
import './header.css';
import satellite from '../../assets/satellite.png';
const Header = () => {
  return (
    <div className="scheduler_header section__padding" id="home">
    <div className="scheduler_header-content">
      <h1 className="gradient__text">Schedule In Between Space and Earth</h1>
      <p> Effortlessly manage and schedule satellite connections with ground stations, view mission timelines and track changes. We're here for you to offer precision in every orbit.</p>

      <div className="scheduler_header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>
      </div>
    <div className='scheduler_header-image'>
      <img src={satellite} alt="satellite" />
     </div>
    
    </div>
  )
}

export default Header
