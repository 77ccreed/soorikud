import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup'

import Hero from "../components/Hero";



const validationSchema = Yup.object().shape({
  nimi: Yup.string()
    .required('Nimi on kohustuslik')
    .min(3, 'Nimi on liiga lühike')
    .max(25, 'Nimi on liiga pikk'),
  telefon: Yup.string()
    .required('Telefon on kohustuslik')
    .min(5, 'Telefoni number on liiga lühike')
    .max(20, 'Telefoni number on liiga pikk')
    .matches(/^[0-9+ ]+$/, 'Telefoni number peab sisaldama ainult numbreid'),
  /*email: Yup.string()
    .email('Email ei ole korrektne')
    .required('Email on kohustuslik')
    .max(30, 'Email on liiga pikk')
  ,*/
  kogus: Yup.number().positive('Kogus peab olema positiivne').required('Kogus on kohustuslik')
    .min(3, 'Kogus on liiga väike')
    .max(10, 'Kogus on liiga suur'),
  //kuupäev is required, kuupäev on kohustuslik. 
  //kuupäev peab olema tulevikus, kuid mitte kaugemal kui 1 aasta. 
  //kuupäev ei tohi olla tänane.
  //kuupäev ei või olla minevikus. 
  //kuupäev on datepickeri kaudu valitud. 
  kuupäev: Yup.date().required('Kuupäev on kohustuslik').min(new Date(new Date().setDate(new Date().getDate())), 'Kuupäev ei tohi olla minevikus või tänane').max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'Kuupäev on liiga kaugel tulevikus'),
  //aeg on required, aeg on kohustuslik.
  //aeg on timepickeri kaudu valitud.
  //aeg ei tohi olla väiksem kui 12:00 ja ei tohi olla suurem kui 18:00
  tellimustingimused: Yup.boolean().oneOf([true], 'Tellimustingimused on kohustuslik').required('Tellimustingimused on kohustuslik'),

})

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}


const Form = ({ setFormData, formData }) => {

  const navigate = useNavigate();

  const today = new Date();
  const numberOfDaysToAdd = 1;
  const date = today.setDate(today.getDate() + numberOfDaysToAdd);
  const defaultValue = new Date(date).toISOString().split('T')[0]

  const initialValues = {
    nimi: "",
    telefon: "",
    //email: "",
    kogus: 3,
    kuupäev: defaultValue,
    aeg: '12:00',
    tellimustingimused: false,
  };



  return (
    <div className="main-page-container">
      <Hero />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={data => {
          console.log(data)
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
              "form-name": "tellimus",
              ...data,
            }),
          })
            .then(() => {
              setFormData(data);
              navigate('/tellimus-tehtud/');
            })
            .catch(error => alert(error))
        }
        }
      >
        {(formik) => {
          const {
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty
          } = formik;
          return (
            <div className="container">
              <h1>Sõõrikute tellimine</h1>
              <p>Täida tühjad väljad.</p>
              <form
                name="tellimus"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={formik.handleSubmit}
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

                <div className="form-grid">

                  <div className="form-row">
                    <label htmlFor="nimi">Nimi</label>
                    <input
                      type="text"
                      name="nimi"
                      id="nimi"
                      value={values.nimi}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.nimi && touched.nimi ? "input-error" : null
                      }
                    />
                    {errors.nimi && touched.nimi && (
                      <span className="error">{errors.nimi}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <label htmlFor="telefon">Telefon</label>
                    <input
                      type="tel"
                      name="telefon"
                      id="telefon"
                      value={values.telefon}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.telefon && touched.telefon ? "input-error" : null
                      }
                    />
                    {errors.telefon && touched.telefon && (
                      <span className="error">{errors.telefon}</span>
                    )}
                  </div>

                  {/*<div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input-error" : null
                    }
                  />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>*/}


                  <div className="form-row">
                    <label htmlFor="kuupäev">Kättesaamise kuupäev</label>
                    <input
                      type="date"
                      name="kuupäev"
                      id="kuupäev"
                      value={values.kuupäev}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      //placeholder={values.kuupäev}
                      //defaultValue={defaultValue}
                      className={
                        errors.kuupäev && touched.kuupäev ? "input-error" : null
                      }
                    />
                    {errors.kuupäev && touched.kuupäev && (
                      <span className="error">{errors.kuupäev}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <label htmlFor="aeg">Kättesaamise kellaaeg</label>
                    <input
                      type="time"
                      name="aeg"
                      id="aeg"
                      min="09:00"
                      max="18:00"
                      value={values.aeg}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.aeg && touched.aeg ? "input-error" : null
                      }
                    />
                    {errors.aeg && touched.aeg && (
                      <span className="error">{errors.aeg}</span>
                    )}
                  </div>


                  <div className="form-row">
                    <label htmlFor="kogus">Sõõrikute kogus (kg)</label>
                    <input
                      type="number"
                      name="kogus"
                      id="kogus"
                      min="3"
                      max="10"
                      step="0.1"
                      value={values.kogus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.kogus && touched.kogus ? "input-error" : null
                      }
                    />
                    {errors.kogus && touched.kogus && (
                      <span className="error">{errors.kogus}</span>
                    )}
                  </div>

                  <br />

                  <div className="form-row">
                    <label htmlFor="tellimustingimused">Nõustun teenusetingimustega</label>
                    <input
                      type="checkbox"
                      name="tellimustingimused"
                      id="tellimustingimused"
                      value={values.tellimustingimused}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.tellimustingimused && touched.tellimustingimused ? "input-error" : null
                      }
                    />
                    {errors.tellimustingimused && touched.tellimustingimused && (
                      <span className="error">{errors.tellimustingimused}</span>
                    )}
                  </div>

                </div>
                <hr />


                <h2>Tellimuse andmed</h2>



                {!values.nimi || !values.telefon || !values.kogus || !values.kuupäev || !values.aeg || !values.tellimustingimused ?
                  <p className="tellimuse-andmed">
                    Täida tühjad väljad ja nõustu teenusetingimustega.
                  </p>
                  : (
                    <p className="tellimuse-andmed">
                      <strong>Tellija:</strong><span className="capitalize">{values.nimi}</span>, tel. nr: {values.telefon}
                      <br />

                      <strong>Sõõrikute kogus:</strong> {values.kogus} kg ehk {parseInt(values.kogus / 0.08)} sõõrikut
                      <br />

                      <strong>Kättesaamise arg:</strong> {values.kuupäev} kell {values.aeg}
                      <br />
                      <strong>Summa:</strong> {values.kogus * 8} €
                      <br />

                    </p>

                  )}






                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid)}
                >
                  Vormista tellimus
                </button>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Form;
