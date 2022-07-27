import React from 'react';
import createPersistedState from 'use-persisted-state';
import './scss-styles/App.scss';
import {
  Routes, Route
} from "react-router-dom";
import Layout from './components/Layout';

import Meist from './pages/Meist';
import Teenusetingimused from './pages/Teenusetingimused';
import Kontakt from './pages/Kontakt';
import Koostööpartnerile from './pages/Koostööpartnerile';
import TellimusTehtud from './pages/TellimusTehtud';
import KiriSaadetud from './pages/KiriSaadetud';

import Form from './pages/Form';

const today = new Date();
const numberOfDaysToAdd = 1;
const date = today.setDate(today.getDate() + numberOfDaysToAdd);
const defaultValue = new Date(date).toISOString().split('T')[0]

function App() {
  const useFormDataState = createPersistedState('formData');


  const [formData, setFormData] = useFormDataState({
    nimi: '',
    telefon: '',
    email: '',
    kogus: 3,
    tellimuse_kättesaamise_aeg_kuupäev: defaultValue,
    aeg: '12:00',
  }
  );



  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Form setFormData={setFormData} formData={formData} />} />
        <Route path="meist/" element={<Meist />} />
        <Route path="teenusetingimused/" element={<Teenusetingimused />} />
        <Route path="partnerile/" element={<Koostööpartnerile />} />
        <Route path="kontakt/" element={<Kontakt />} />
        <Route path="tellimus-tehtud/" element={<TellimusTehtud formData={formData} setFormData={setFormData} />} />
        <Route path="kiri-saadetud/" element={<KiriSaadetud />} />

        <Route path="*" element={<Form setFormData={setFormData} formData={formData} />} />
      </Routes>
    </Layout>
  );
}

export default App;
