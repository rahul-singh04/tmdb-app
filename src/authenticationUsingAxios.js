import axios from 'axios';

const API_KEY = 'your_api_key';
const USERNAME = 'your_username';
const PASSWORD = 'your_password';

// Step 1 - Get a request token
axios
  .get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`)
  .then(response => {
    const requestToken = response.data.request_token;

    // Step 2 - Validate username and password
    const body = {
      username: USERNAME,
      password: PASSWORD,
      request_token: requestToken,
    };

    return axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`, body);
  })
  .then(response => {
    const validatedRequestToken = response.data.request_token;

    // Step 3 - Create a session
    const body = {
      request_token: validatedRequestToken,
    };

    return axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`, body);
  })
  .then(response => {
    const sessionId = response.data.session_id;
    console.log(sessionId);
  })
  .catch(error => console.error(error));
