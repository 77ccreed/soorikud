import React from 'react'
import { Link } from "react-router-dom";

const KiriSaadetud = () => {
  return (
    <div className="container">
      <h1>Kiri on saadetud.</h1>
      <p>Aitäh. Vastame esimesel võimalusel.</p>
      <Link to="/">
        <p>
          Tagasi avalehele
        </p>
      </Link>
    </div>
  )
}

export default KiriSaadetud