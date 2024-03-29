import React from 'react'
import {
  Outlet, NavLink
} from "react-router-dom";

const Navbar = () => {

  let activeStyle = {
    //textDecoration: "underline",
    //color: '#fca311;'
  };

  return (
    <>
      <header className='navbar'>
        <NavLink to='/' className='navbar__title'>Värsked Sõõrikud OÜ</NavLink>
        <nav className='navbar__items'>
          <NavLink to='/meist/' className='navbar__item' style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Meist</NavLink>
          <NavLink to='/teenusetingimused/' className='navbar__item' style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Teenusetingimused</NavLink>
          <NavLink to='/kontakt/' className='navbar__item' style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }>Kontakt</NavLink>
        </nav>
      </header>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  )
}

export default Navbar