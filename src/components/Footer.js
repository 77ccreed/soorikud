import React from 'react'
import { NavLink } from "react-router-dom";
import Facebook from '../img/SVG/facebook-f-brands.svg'

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
        <div className='footer-content'>
          <p className='footer-content-item-a'><a href='https://www.facebook.com/V%C3%A4rsked-S%C3%B5%C3%B5rikud-341996712898394/' target='blank'><img src={Facebook} alt='Facebooki ikoon' color='white' width={30} height={30} /></a></p>
          <p className='footer-content-item-b'><NavLink to='/'>Värsked Sõõrikud OÜ</NavLink></p>
          <p className='footer-content-item-c'>Reg. kood 14279980</p>
          <p className='footer-content-item-d'><a href='+372510 3606'>Tel: 510 3606</a></p>
          <p className='footer-content-item-e'>Kooli 6, Võru, 65606 Võru maakond</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer