import React from 'react'
import Image from "next/image";
import york from '../../assets/web/york.png';
import csa from '../../assets/web/csa.png';

const Brand = () => {
  return (
    <div className='scheduler_brand section_padding'>
     <div>
      <Image src={york as string} alt='YorkU Logo' width={200} height={100} />
    </div>
    <div>
      <Image src={csa as string} alt='CSA Logo' width={200} height={100} />
    </div>
    </div>
  )
}

export default Brand
