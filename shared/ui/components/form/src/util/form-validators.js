import { matchIsValidTel } from 'mui-tel-input';

// React-Hook-Form field validators

export default (() => {
  const required = 'Ce champ est obligatoire.';

  return {
    name: {
      required,
    },
    email: {
      required,
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "L'adresse e-mail est invalide.",
      },
    },
    phone: {
      required,
      validate: (val) => {
        const splitVal = val.split(' ');
        if (splitVal[0] !== '+33') splitVal.unshift('+33');
        return matchIsValidTel(splitVal.join(' ')) || 'Téléphone invalide.';
      },
    },
    search: { required },
    message: {
      required,
    },
    consent: {
      validate: (val) => Boolean(val) || 'Please check the box to continue.',
    },
    date: {
      required: 'Please pick a date',
    },
  };
})();
