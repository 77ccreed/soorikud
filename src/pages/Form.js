import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup'

import parse from "date-fns/parse";

//import Hero from "../components/Hero";




const validationSchema = Yup.object().shape({
  //date must be in the future
  tellimuse_kättesaamise_aeg_kuupäev: Yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")

    .min("1969-11-13", "Date is too early")
  ,
  nimi: Yup.string()
    .required('Nimi on kohustuslik')
    .min(3, 'Nimi on liiga lühike')
    .max(25, 'Nimi on liiga pikk'),
  telefon: Yup.string()
    .required('Telefon on kohustuslik')
    .min(5, 'Telefoni number on liiga lühike')
    .max(15, 'Telefoni number on liiga pikk')
    .matches(/^[0-9]+$/, 'Telefoni number peab sisaldama ainult numbreid'),
  email: Yup.string()
    .email('Email ei ole korrektne')
    .required('Email on kohustuslik')
    .max(30, 'Email on liiga pikk')
  ,
  kogus: Yup.number().positive('Kogus peab olema positiivne').required('Kogus on kohustuslik')
    .min(3, 'Kogus on liiga väike')
    .max(10, 'Kogus on liiga suur'),
  //tellimuse_kättesaamise_aeg_kuupäev: Yup.date().min(new Date(), 'Kättesaamise kuupäev peab olema tulevikus'),
  // ,
  //date must be in the future
  //tellimuse_kättesaamise_aeg_kuupäev: Yup.date().required('Kättesaamise kuupäev on kohustuslik'),
  //tellimuse_kättesaamise_aeg_kellaaeg: Yup.string().required('Kättesaamise kellaaeg on kohustuslik')



})




const Form = ({ setFormData }) => {

  const navigate = useNavigate()

  const initialValues = {
    nimi: "",
    telefon: "",
    email: "",
    kogus: 3,
    kuupäev: '',
    aeg: '12:00',
  };

  const submitForm = (values) => {

    setFormData(values);

  };
  return (
    <>

      <Formik
        initialValues={initialValues}
        //validate={validate}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty
          } = formik;
          return (
            <div className="container">
              <h1>Sõõrikute tellimine</h1>
              <form
                name="tellimus"
                method="post"
                action="/tellimus-tehtud"
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

                <div className="form-row">
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
                </div>

                <div className="form-row">
                  <label htmlFor="kogus">Kogus (kg)</label>
                  <input
                    type="number"
                    name="kogus"
                    id="kogus"
                    min="3"
                    max="15"
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

                <div className="form-row">
                  <label htmlFor="kuupäev">Kättesaamise kuupäev</label>
                  <input
                    type="date"
                    name="kuupäev"
                    id="kuupäev"
                    value={values.kuupäev}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
    </>
  );
};

export default Form;
