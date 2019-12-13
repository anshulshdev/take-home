function parseJSON(response) {
  const { headers } = response;
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function fetchAPI(url, method = 'GET', payload = null) {
  // check if accessToken is needed
  const options = { method };
  const headers = { 'Content-Type': 'application/json' };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(resp => resp)
    .catch((err) => {
      throw err;
    });
}
