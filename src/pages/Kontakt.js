import React from 'react'
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup'



const Kontakt = () => {




  return (
    <form
      name="kontakt"
      method="post"
      action="/kiri-saadetud/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >

      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="kontakt" />
      <div hidden>
        <label>
          Don’t fill this out:{' '}
          <input
            name="bot-field"
          />
        </label>
      </div>
      <div className="fields">
        <div className="field">
          <label htmlFor="name">Sinu nimi</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">E-kirja aadress</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div className="field">
          <label htmlFor="message">Sõnum</label>
          <textarea name="message" id="message" rows="4" required></textarea>
        </div>
      </div>
      <div className="actions">

        <input type="submit" value="Saada sõnum" />

      </div>
    </form>
  )
}



export default Kontakt