const isLocalhost = window.location.hostname === 'localhost';
const backendURL = isLocalhost ? 'http://localhost:1337' : 'https://jsramverk-train-gara20.azurewebsites.net';

export default {
  backendURL,
};
