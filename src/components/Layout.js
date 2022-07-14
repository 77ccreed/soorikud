import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'


const Layout = (props) => {
  return (
    <body>
      <Navbar />
      <main>
        {props.children}
      </main>
      <Footer />
    </body>
  )
}

export default Layout