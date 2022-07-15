import React from 'react'
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup'


const Kontakt = () => {

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
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
    sõnum: Yup.string()
      .required('Sõnum on kohustuslik')
      .min(3, 'Sõnum on liiga lühike')
      .max(10000, 'Sõnum on liiga pikk'),
  }
  )


  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const initialValues = {
    name: "",
    email: "",
    message: ""
  }

  const onSubmit = (values, submitProps) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "kontakt", ...values })
    })
      .then(() => {
        submitProps.setSubmitting(false);
        navigate('/kiri-saadetud/');
      }
      )
      .catch(error => {
        //console.log(error);
        submitProps.setSubmitting(false);
      }
      )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          name="kontakt"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}

        >
          <label htmlFor="name">Nimi</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && <div>{errors.name}</div>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <label htmlFor="message">Sõnum</label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          {errors.message && touched.message && <div>{errors.message}</div>}
          <button type="submit" disabled={isSubmitting}>
            Kirjuta
          </button>


        </form>
      )}

    </Formik>
  )
}



export default Kontakt