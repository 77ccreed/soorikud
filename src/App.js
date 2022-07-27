import React, { useEffect } from 'react';
import createPersistedState from 'use-persisted-state';
import './scss-styles/App.scss';
import {
  Routes, Route, Navigate
} from "react-router-dom";
import Layout from './components/Layout';

import Meist from './pages/Meist';
import Teenusetingimused from './pages/Teenusetingimused';
import Kontakt from './pages/Kontakt';
import Koostööpartnerile from './pages/Koostööpartnerile';
import TellimusTehtud from './pages/TellimusTehtud';
import KiriSaadetud from './pages/KiriSaadetud';
import Avaleht from './pages/Avaleht';

import defaultValue from './constants/defaultValue';

function App() {
  const useFormDataState = createPersistedState('formData');

  const [formData, setFormData] = useFormDataState({
    nimi: null,
    telefon: null,
    email: null,
    kogus: null,
    kuupäev: null,
    aeg: null,
    kehtivTellimus: false,
  }
  );

  useEffect(() => {
    if (formData.kuupäev && formData.aeg && formData.kehtivTellimus) {
      const kuupäev = formData.kuupäev.split('-');
      const aeg = formData.aeg.split(':');
      const date = new Date(kuupäev[0], kuupäev[1] - 1, kuupäev[2], aeg[0], aeg[1]);

      if (date.getTime() < new Date().getTime()) {
        console.log('aeg on minevikus');
        setFormData({
          nimi: '',
          telefon: '',
          //email: "",
          kogus: 3,
          kuupäev: defaultValue,
          aeg: '12:00',
          tellimustingimused: false,
          kehtivTellimus: false,
        });
      }
    }
  }, []);


  return (
    <Layout setFormData={setFormData} formData={formData}>
      <Routes>
        <Route path="/" element={<Avaleht setFormData={setFormData} formData={formData} />} />
        <Route path="meist/" element={<Meist />} />
        <Route path="teenusetingimused/" element={<Teenusetingimused />} />
        <Route path="partnerile/" element={<Koostööpartnerile />} />
        <Route path="kontakt/" element={<Kontakt />} />
        <Route path="kiri-saadetud/" element={<KiriSaadetud />} />

        {formData.kehtivTellimus && (
          <Route path="tellimus-tehtud/" element={<TellimusTehtud formData={formData} setFormData={setFormData} />} />
        )}
        <Route path="*" element={<Avaleht setFormData={setFormData} formData={formData} />} />
      </Routes>
    </Layout>
  );
}

export default App;
