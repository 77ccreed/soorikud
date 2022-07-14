import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const stepOneValidationSchema = Yup.object().shape({
  nimi: Yup.string()
    .required('Nimi on kohustuslik'),
  telefon: Yup.string()
    .required('Telefon on kohustuslik'),
  email: Yup.string()
    .email('Email ei ole korrektne')

})

const StepOne = (props) => {

  const handleSubmit = (values) => {
    props.next(values)
  }

  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >{
        () => (
          <Form className='form'>
            <div className='form-group'>
              <label htmlFor="nimi">Nimi *</label>
              <Field name="nimi" type="text" />
              <ErrorMessage name="nimi" />
            </div>

            <div className='form-group'>
              <label htmlFor="telefon">Telefon *</label>
              <Field name="telefon" type="tel" />
              <ErrorMessage name="telefon" />
            </div>

            <div className='form-group'>
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" />
              <ErrorMessage name="email" />
            </div>

            <div className='form-group'>
              <button type='submit'>Järgmine</button>
            </div>
          </Form>
        )
      }</Formik>
  )
}

export default StepOne