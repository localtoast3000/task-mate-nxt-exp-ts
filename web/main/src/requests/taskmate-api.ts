import BasicHttpRequests from 'shared.util/requests/base';

export default (() => {
  return {
    ...BasicHttpRequests(`${process.env.API_HOST}:${process.env.API_PORT}`),
  };
})();
