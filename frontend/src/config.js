const isLocalhost = window.location.hostname === 'localhost';
const backendURL = isLocalhost ? 'http://localhost:1337' : 'https://jsramverk-train-gara20.azurewebsites.net';

// console.log(`utskrift apiURL i config.js,frontend = ${backendURL}`)

export default backendURL;
