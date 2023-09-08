import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import BasicHttpRequests from '../base';

export default (() => {
  return {
    ...BasicHttpRequests(process.env.AUTH_ORIGIN as string),
  };
})();
