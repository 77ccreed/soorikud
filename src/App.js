import React, { useState } from 'react';
import './scss-styles/App.scss';
import {
  Routes, Route
} from "react-router-dom";
import Layout from './components/Layout';

import MultiStepForm from './pages/MultiStepForm';
import Meist from './pages/Meist';
import Kontakt from './pages/Kontakt';
import Koostööpartnerile from './pages/Koostööpartnerile';
import TellimusTehtud from './pages/TellimusTehtud';
import KiriSaadetud from './pages/KiriSaadetud';

import Form from './pages/Form';

function App() {

  const [formData, setFormData] = useState({
    nimi: '',
    telefon: '',
    email: '',
    kogus: '',
    tellimuse_kättesaamise_aeg_kuupäev: '',
    tellimuse_kättesaamise_aeg_kellaaeg: '',
  })

  console.log(formData)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Form setFormData={setFormData} />} />
        <Route path="meist/" element={<Meist />} />
        <Route path="partnerile/" element={<Koostööpartnerile />} />
        <Route path="kontakt/" element={<Kontakt />} />
        <Route path="tellimus-tehtud/" element={<TellimusTehtud formData={formData} />} />
        <Route path="kiri-saadetud/" element={<KiriSaadetud />} />

        <Route path="*" element={<MultiStepForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
