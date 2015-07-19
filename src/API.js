import request from 'superagent'

const apiBase = 'https://api.damonmcminn.com/nutrition/'

const API = {
  foodSearch(food, callback) {
    request
      .get(food)
      .use(req => {
        let query = req.url
          .split(' ')
          .map(word => `search=${word}`)
          .reduce((a,b) => `${a}&${b}`)
        req.url = `${apiBase}food?${query}`;
      })
      .end(handleResponse.bind(callback));
  },
  nextResults(url, callback) {
    request
      .get(url)
      .end(handleResponse.bind(callback));
  }
}

export default API;

function handleResponse(err, res) {
  // this === bound callback
  if (err) {
    this(err);
  } else {
    this(null, res.body);
  }
}
