// window.fetch polyfill
// can't do conditional import...
import 'whatwg-fetch'

function request(url) {
  return fetch(url)
    .then(errResponseHandler)
    .then(parseJSON)
}

function parseJSON(res) {
  return res.json();
}

function errResponseHandler(res) {
  if (res.status !== 200) {
    throw new Error('Response error');
  }

  return res;
}

export default request;
