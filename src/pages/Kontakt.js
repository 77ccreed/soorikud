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
      .max(20, 'Telefoni number on liiga pikk')
      .matches(/^[0-9+ ]+$/, 'Telefoni number peab sisaldama ainult numbreid'),
    email: Yup.string()
      .email('Email ei ole korrektne')
      .required('Email on kohustuslik')
      .max(30, 'Email on liiga pikk')
    ,
    sõnum: Yup.string()
      .required('Sõnum on kohustuslik')
      .min(10, 'Sõnum on liiga lühike')
      .max(10000, 'Sõnum on liiga pikk'),
  }
  )


  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const initialValues = {
    nimi: "",
    telefon: "",
    email: "",
    sõnum: "",
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={data => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "kontakt",
            ...data,
          }),
        })
          .then(() => {
            navigate('/kiri-saadetud/');
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
          <div className="form-container">
            <h1>Saada sõnum</h1>
            <p>Vastame esimesel võimalusel.</p>
            <form
              name="kontakt"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={formik.handleSubmit}
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
                <label htmlFor="sõnum">Sõnum</label>
                <textarea
                  name="sõnum"
                  id="sõnum"
                  value={values.sõnum}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.sõnum && touched.sõnum ? "input-error" : null
                  }
                />
                {errors.sõnum && touched.sõnum && (
                  <span className="error">{errors.sõnum}</span>
                )}
              </div>


              <div className="form-row">
                <button
                  type="submit"
                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                  disabled={!(dirty && isValid)}
                >
                  Saada sõnum
                </button>
              </div>




            </form>
          </div>
        );
      }}
    </Formik>
  )
}



export default Kontakt