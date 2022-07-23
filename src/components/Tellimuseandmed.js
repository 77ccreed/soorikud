import React from 'react'

const Tellimuseandmed = ({ values }) => {
  return (
    <div className='tellimuse-andmed-container'>
      <hr />
      <h2>Tellimuse andmed</h2>
      {!values.nimi || !values.telefon || !values.kogus || !values.kuupäev || !values.aeg || !values.tellimustingimused ?
        <p className="tellimuse-andmed">
          Täida tühjad väljad, vali sobiv aeg ja nõustu teenusetingimustega.
        </p>
        : (
          <p className="tellimuse-andmed">
            <strong>Tellija:</strong><span className="capitalize">{values.nimi}</span>, tel nr: {values.telefon}
            <br />
            <strong>Sõõrikute kogus:</strong> {values.kogus} kg ehk {parseInt(values.kogus / 0.08)} sõõrikut
            <br />
            <strong>Kättesaamise arg:</strong> {values.kuupäev} kell {values.aeg}
            <br />
            <strong>Summa:</strong> {values.kogus * 8} €
            <br />
          </p>
        )}
    </div>
  )
}

export default Tellimuseandmed