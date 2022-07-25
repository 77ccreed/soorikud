import * as Yup from 'yup';


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
  /*email: Yup.string()
    .email('Email ei ole korrektne')
    .required('Email on kohustuslik')
    .max(30, 'Email on liiga pikk')
  ,*/
  kogus: Yup.number().positive('Kogus peab olema positiivne').required('Kogus on kohustuslik')
    .min(3, 'Kogus on liiga väike')
    .max(10, 'Kogus on liiga suur'),
  kuupäev: Yup.date().required('Kuupäev on kohustuslik').min(new Date(new Date().setDate(new Date().getDate())), 'Kuupäev ei tohi olla minevikus või tänane').max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'Kuupäev on liiga kaugel tulevikus'),
  aeg: Yup.string().required('Aeg on kohustuslik')
    .test('aeg', 'Tellimusi võetakse vastu 12:00 kuni 18:00.', function (value) {
      if (value) {
        const aeg = value.split(':');
        const hours = parseInt(aeg[0]);
        const minutes = parseInt(aeg[1]);
        if (hours >= 12 && hours <= 18 && minutes >= 0 && minutes <= 59) {
          return true;
        }
      }
      return false;
    }
    ),

  tellimustingimused: Yup.boolean().oneOf([true], 'Kohustuslik väli').required('Kohustuslik väli'),

})


export default validationSchema