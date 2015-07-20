import alt from '../alt'

import FoodFetcher from '../utils/FoodFetcher'


class CarbCounterActions {
  updateFoods(data) {
    this.dispatch(data);
  }
  search(food) {
    this.dispatch();

    FoodFetcher.search(food)
      .then(data => this.actions.updateFoods(data))
      // .catch
  }
}

export default alt.createActions(CarbCounterActions);
