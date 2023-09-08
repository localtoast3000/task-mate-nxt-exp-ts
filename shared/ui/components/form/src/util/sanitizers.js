export default (() => {
  return {
    phone(value) {
      const phoneSplit = value.split(' ');
      if (phoneSplit[0] !== '+33') phoneSplit.unshift('+33');
      if (phoneSplit[1].length === 2) {
        let firstNumber = phoneSplit[1].split('');
        if (firstNumber[0] === '0') {
          firstNumber = firstNumber[1];
          phoneSplit[1] = firstNumber;
        }
      }
      return phoneSplit.join(' ');
    },
  };
})();
