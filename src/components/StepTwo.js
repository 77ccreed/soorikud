import React from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const stepTwoValidationSchema = Yup.object().shape({
  kogus: Yup.number().positive('Kogus peab olema positiivne').required('Kogus on kohustuslik'),
  tellimuse_kättesaamise_aeg_kuupäev: Yup.date().required('Kättesaamise kuupäev on kohustuslik'),
  //tellimuse_kättesaamise_aeg_kellaaeg: Yup.date().required('Kättesaamise kellaaeg on kohustuslik'),
}
)

const StepTwo = (props) => {
  let navigate = useNavigate();

  const handleSubmit = (values) => {
    props.next(values, true)

    navigate('/tellimus-tehtud');

  }

  return (
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >{
        ({ values }) => (
          <Form>
            <div>
              <label htmlFor="kogus">Kogus *</label>
              <Field name="kogus" type="number" min='3' max='15' placeholder='3' />
              <ErrorMessage name="kogus" />
            </div>
            <div>
              <label htmlFor="tellimuse_kättesaamise_aeg_kuupäev">Kättesaamise kuupäev *</label>
              <Field name="tellimuse_kättesaamise_aeg_kuupäev" type="date" />
              <ErrorMessage name="tellimuse_kättesaamise_aeg_kuupäev" />
            </div>
            <div>
              <label htmlFor="tellimuse_kättesaamise_aeg_kellaaeg">Kättesaamise kellaaeg *</label>
              <Field name="tellimuse_kättesaamise_aeg_kellaaeg" type="time" min="12:00" max="18:00" />
              <ErrorMessage name="tellimuse_kättesaamise_aeg_kellaaeg" />
            </div>

            <div>
              <button type='button' onClick={() => props.prev(values)}>Tagasi</button>
              <button type='submit'>Vormista tellimus</button>
            </div>
          </Form>

        )
      }</Formik>
  )
}

export default StepTwo