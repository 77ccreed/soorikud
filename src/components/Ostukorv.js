import React from 'react'
import encode from './encode'

const today = new Date();
const numberOfDaysToAdd = 1;
const date = today.setDate(today.getDate() + numberOfDaysToAdd);
const defaultValue = new Date(date).toISOString().split('T')[0]

const Ostukorv = ({ formData, setFormData }) => {

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
      <h1>Teie tellimus</h1>
      <p>
        <strong>Nimi:</strong> {formData.nimi}
        <br />
        <strong>Telefon:</strong> {formData.telefon}
        <br />
        <strong>Kättesaamise aeg:</strong> {formData.kuupäev} {formData.aeg}
        <br />
        <strong>Sõõrikute kogus:</strong> {formData.kogus} kg
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