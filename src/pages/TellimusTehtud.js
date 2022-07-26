import React from 'react'
//import { Formik } from "formik";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}


const TellimusTehtud = ({ formData, setFormData }) => {
  console.log(formData)



  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var selectedDate = new Date(formData.kuupäev);
  var formattedDate = selectedDate.toLocaleDateString("et-EE", options);

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({ ...formData, kogus: 0 })

    // const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': "tellimus",
        ...formData,
      }),
    })
      .catch(error => alert(error))

  }

  return (
    <div className="container">
      <h1>{formData.kogus !== 0 ? 'Tellimus tehtud' : 'Tellimus tühistatud'}</h1>
      {formData.kogus !== 0 ? (
        <>
          <p><span className='capitalize'>{formData.nimi}</span>, aitäh!</p>
          <p>
            {formattedDate}, kell {formData.aeg}.
            <br />
            {formData.kogus} kg sõõrikuid ({parseInt(formData.kogus / 0.08)} tk) ootab teid aadressil Kooli 6, Võru.
            <br />
            Summa: {formData.kogus * 8} €
          </p>
          <form
            name="tellimus"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
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
        </>
      ) : (
        <p><span className='capitalize'>{formData.nimi}</span>, Teie tellimus on tühistatud.</p>)}
    </div >
  )
}

export default TellimusTehtud