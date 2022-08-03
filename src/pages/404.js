import React from 'react'
import { Link } from "react-router-dom";

const LehteEiLeitud = () => {
  return (

    <div className='container'>
      <h1>Lehte ei leitud</h1>
      <Link to="/">
        <p>
          Tagasi avalehele
        </p>
      </Link>
    </div>
  )
}

export default LehteEiLeitud