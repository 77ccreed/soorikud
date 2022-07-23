import * as Yup from 'yup'

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
  //kuupäev is required, kuupäev on kohustuslik. 
  //kuupäev peab olema tulevikus, kuid mitte kaugemal kui 1 aasta. 
  //kuupäev ei tohi olla tänane.
  //kuupäev ei või olla minevikus. 
  //kuupäev on datepickeri kaudu valitud. 
  kuupäev: Yup.date().required('Kuupäev on kohustuslik').min(new Date(new Date().setDate(new Date().getDate())), 'Kuupäev ei tohi olla minevikus või tänane').max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), 'Kuupäev on liiga kaugel tulevikus'),
  //aeg on required, aeg on kohustuslik.
  //aeg on timepickeri kaudu valitud.
  //aeg ei tohi olla väiksem kui 12:00 ja ei tohi olla suurem kui 18:00
  tellimustingimused: Yup.boolean().oneOf([true], 'Kohustuslik väli').required('Kohustuslik väli'),

})


export default validationSchema