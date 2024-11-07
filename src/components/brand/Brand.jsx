import React from 'react'
import './brand.css';
import york from '../../assets/york.png';
import csa from '../../assets/csa.png';

const Brand = () => {
  return (
    <div className='scheduler_brand section_padding'>
     <div>
      <img src={york} alt='york' />
    </div>
    <div>
      <img src={csa} alt='csa' />
    </div>
    </div>
  )
}

export default Brand
