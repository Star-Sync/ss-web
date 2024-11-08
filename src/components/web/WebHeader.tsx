import React from 'react'

import Image from 'next/image';
import satellite from '../../assets/satellite.png';
const WebHeader = () => {
  return (
    <div className="scheduler_header section__padding" id="home">
    <div className="scheduler_header-content">
      <h1 className="gradient__text">Schedule In Between Space and Earth</h1>
      <p> Effortlessly manage and schedule satellite connections with ground stations, view mission timelines and track changes. We&apos;re here for you to offer precision in every orbit.</p>

      <div className="scheduler_header-content__input">
        {/* <input type="email" placeholder="Your Email Address" /> */}
        <button type="button">More Information</button>
      </div>
      </div>
    <div className='scheduler_header-image'>
      <Image src={satellite} alt="satellite" />
     </div>
    
    </div>
  )
}

export default WebHeader
