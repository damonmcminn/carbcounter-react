import React from 'react'
import _ from 'lodash'

import ResultsTable from './resultsTable'

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data;
    let search = this.props.search;

    if (_.isEmpty(data) || !search) {
      return null;
    } else if (!_.isEmpty(data.foods)) {
      let [foods, isGrams] = processFoods(data.foods, this.props.grams);
      return <ResultsTable foods={foods} isGrams={isGrams} />;
    } else {
      return <h4 style={{marginTop: '85px'}} className="text-center">No results for {search}</h4>;
    }
  }
}

export default Results;

function processFoods(xs, grams) {
  let foods = xs.map(food => {
    let carb = food.carbohydrate;
    return {
      name: food.name,
      carbs: Math.round(grams ? carb * grams : carb * 100)
    }
  });
  // [Array, Boolean]
  return [foods, !!grams]
}
