import React from 'react'
import { Link } from 'react-router-dom'


const TellimusTehtud = ({ formData }) => {

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var selectedDate = new Date(formData.kuupäev);
  var formattedDate = selectedDate.toLocaleDateString("et-EE", options);


  return (
    <div className="container">
      <h1>Tellimus tehtud</h1>

      <p className="tellimuse-andmed">
        <strong>Tellija:</strong><span className="capitalize">{formData.nimi}</span>, tel: {formData.telefon}
        <br />
        <strong>Sõõrikute kogus:</strong> {formData.kogus} kg ehk {parseInt(formData.kogus / 0.08)} sõõrikut
        <br />
        <strong>Kättesaamise aeg:</strong> {formattedDate}, kell {formData.aeg}
        <br />
        <strong>Kättesaamise koht:</strong> Kooli 6, Võru
        <br />
        <strong>Summa:</strong> {formData.kogus * 8} €
      </p>

      <Link to="/">
        Tühista tellimus avalehel
      </Link>
    </div >
  )
}

export default TellimusTehtud