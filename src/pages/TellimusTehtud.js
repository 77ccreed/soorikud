import React from 'react'

const TellimusTehtud = ({ formData }) => {
  console.log(formData)
  return (
    <div className="container">
      <h1>Tellimus tehtud</h1>
      <p>{formData.nimi}, aitäh!</p>
      <p>
        {formData.kogus} kg sõõrikuid ootab teid {formData.kuupäev} kell {formData.aeg}.

      </p>
    </div>
  )
}

export default TellimusTehtud