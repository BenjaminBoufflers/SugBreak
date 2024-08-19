const config = {
  apiUrl: import.meta.env.ENV === 'production'
    ? 'https://gentle-citadel-85847-6ce2d6bf71ee.herokuapp.com'
    : 'http://localhost:5000'
};

export default config;