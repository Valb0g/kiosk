const url = {
  history: '/',
  deposit: '/deposit',
  withdraw: '/withdraw',
  login: '/login',
};
export default url;
export const baseUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_DEV_BASE_URL
  : process.env.REACT_APP_PROD_BASE_URL;
