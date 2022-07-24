import React from 'react'

const TellimusTehtud = ({ formData }) => {
  console.log(formData)

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var selectedDate = new Date(formData.kuupäev);
  var formattedDate = selectedDate.toLocaleDateString("et-EE", options);

  return (
    <div className="container">
      <h1>Tellimus tehtud</h1>
      <p><span className='capitalize'>{formData.nimi}</span>, aitäh!</p>
      <p>
        {formattedDate}, kell {formData.aeg}.
        <br />
        {formData.kogus} kg sõõrikuid ({parseInt(formData.kogus / 0.08)} tk) ootab teid aadressil Kooli 6, Võru.
        <br />
        Summa: {formData.kogus * 8} €
      </p>
      <p>
        Tühista tellimus
      </p>
    </div>
  )
}

export default TellimusTehtud