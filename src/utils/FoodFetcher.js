import request from './request'

class FoodFetcher {
  constructor (host) {
    this.host = host
  }

  search (food) {
    let query = food.split(' ')
      .map(word => `search=${word}`)
      .reduce((a, b) => `${a}&${b}`)

    let url = `${this.host}/food?${query}`

    return request(url)
  }

  next (url) {
    return request(url)
  }
}

export default FoodFetcher
