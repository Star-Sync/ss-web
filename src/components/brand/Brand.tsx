import React from 'react'
import Image from 'next/image';
import york from '../../assets/york.png';
import csa from '../../assets/csa.png';

const Brand = () => {
  return (
    <div className='scheduler_brand section_padding'>
     <div>
      <Image src={york} alt='york' />
    </div>
    <div>
      <Image src={csa} alt='csa' />
    </div>
    </div>
  )
}

export default Brand
