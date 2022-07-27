import React from 'react'

import Hero from '../components/Hero'
import Form from '../components/Form'
import Ostukorv from '../components/Ostukorv'

const Avaleht = ({ formData, setFormData }) => {
  console.log(formData.kehtivTellimus);
  return (
    <div className="main-page-container">
      <Hero />
      {formData.kehtivTellimus ? <Ostukorv formData={formData} setFormData={setFormData} /> : <Form formData={formData} setFormData={setFormData} />}
    </div>
  )
}

export default Avaleht