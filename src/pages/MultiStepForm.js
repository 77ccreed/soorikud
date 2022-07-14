import React, { useState } from 'react'
import StepOne from '../components/StepOne'
import StepTwo from '../components/StepTwo'


const MultiStepForm = () => {
  const [data, setData] = useState({
    nimi: '',
    telefon: '',
    email: '',
    kogus: '',
    tellimuse_kättesaamise_aeg_kuupäev: '',
    tellimuse_kättesaamise_aeg_kellaaeg: '',
  })
  const [currentStep, setCurrentStep] = useState(0)

  const makeRequest = (formData) => {
    console.log('tehtud', formData)
  }

  const handleNextStep = (newData, finale = false) => {
    setData(prev => ({ ...prev, ...newData }))
    setCurrentStep(prev => prev + 1)

    if (finale) {
      makeRequest(newData)
      return
    }
  }

  const handlePrevStep = (newData) => {
    setData(prev => ({ ...prev, ...newData }))
    setCurrentStep(prev => prev - 1)
  }


  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />
  ]

  return (
    <div className='form-container'>
      {steps[currentStep]}
    </div>
  )
}

export default MultiStepForm