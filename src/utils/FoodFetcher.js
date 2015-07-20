import request from './request'

const FoodFetcher = {
  search(food) {
    let query = food.split(' ')
      .map(word => `search=${word}`)
      .reduce((a,b) => `${a}&${b}`)

    let url = `https://api.damonmcminn.com/nutrition/food?${query}`;

    return request(url)
  },
  next(url) {
    return request(url)
  }
};
