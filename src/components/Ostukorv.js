import React from 'react'
import encode from '../constants/encode'
import defaultValue from '../constants/defaultValue'



const Ostukorv = ({ formData, setFormData }) => {

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var selectedDate = new Date(formData.kuupäev);
  var formattedDate = selectedDate.toLocaleDateString("et-EE", options);

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({ ...formData, kogus: 0, kehtivTellimus: false })
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': "tellimus",
        ...formData, kogus: 0,
      }),
    })
    setFormData({ nimi: '', telefon: '', kogus: 3, kuupäev: defaultValue, aeg: '12:00', tellimustingimused: false, kehtivTellimus: false })
      .catch(error => alert(error))
  }
  return (
    <div className='container'>
      <h1>Tellimuse andmed</h1>
      <p className="tellimuse-andmed">
        <strong>Tellija:</strong><span className="capitalize">{formData.nimi}</span>, tel: {formData.telefon}
        <br />
        <strong>Sõõrikute kogus:</strong> {formData.kogus} kg ehk {parseInt(formData.kogus / 0.08)} sõõrikut
        <br />
        <strong>Kättesaamise arg:</strong> {formattedDate}, kell {formData.aeg}
        <br />
        <strong>Kättesaamise koht:</strong> Kooli 6, Võru
        <br />
        <strong>Summa:</strong> {formData.kogus * 8} €
      </p>

      <form
        name="tellimus"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className='form-container'
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="tellimus" />
        <div hidden>
          <label>
            Don’t fill this out:{' '}
            <input
              name="bot-field"
            />
          </label>
        </div>

        <button type="submit">
          Tühista tellimus
        </button>
      </form>
    </div>
  )
}

export default Ostukorv