import React from 'react'
//import Facebook from '../img/SVG/facebook-f-brands.svg'

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
        {/*<p><a href='https://www.facebook.com/V%C3%A4rsked-S%C3%B5%C3%B5rikud-341996712898394/' target='blank'><img src={Facebook} alt='Facebooki ikoon' color='white' /></a></p>*/}
        <div className='footer-content'>
          <p>Värsked Sõõrikud OÜ</p>
          <p>Reg. kood 14279980</p>
          <p><a href='+372510 3606'>Tel: 510 3606</a></p>
          <p>Kooli 6, Võru, 65606 Võru maakond</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer