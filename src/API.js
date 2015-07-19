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
      .end((err, res) => {
        callback(err, res.body);
      });
  },
  nextResults(url, callback) {
    request
      .get(url)
      .end((err, res) => {
        callback(err, res.body);
      });
  }
}

export default API;
