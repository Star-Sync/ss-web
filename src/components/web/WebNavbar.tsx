import React, {useState} from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Image from 'next/image';
import logo from '../../assets/web/logo.png';


const WebNavbar = () => {
const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='scheduler_navbar'>
      <div className='scheduler_navbar-links'>
      <div className='scheduler_navbar-links_logo'>
        <Image src={logo} alt='logo' />
        </div>
        <div className='scheduler_navbar-links_container'>
          <p><a href='#home'>Home</a></p>
          <p><a href='#guide'>User Guide</a></p>
          <p><a href='#faq'>FAQ</a></p>
        </div>
      </div>
     

     <div className='scheduler_navbar-sign'>
     <button type='button'>Sign in</button></div>

     <div className='scheduler_navbar-menu'>
      {toggleMenu
      ? <RiCloseLine color = "#fff" size={27} onClick={() => setToggleMenu(false)} />
      : <RiMenu3Line color = "#fff" size={27} onClick={() => setToggleMenu(true)} />
    }
    {toggleMenu && (
       <div className="scheduler_navbar-menu_container scale-up-center">
          <div className="scheduler_navbar-menu_container-links">
          <p><a href='#home'>Home</a></p>
          <p><a href='#guide'>User Guide</a></p>
          <p><a href='#faq'>FAQ</a></p>
          </div>
          <div className="scheduler_navbar-menu_container-links-sign">
          <button type="button">Sign in</button>
          </div>
        </div>
        )}
     </div>
    </div>
  )
}

export default WebNavbar
