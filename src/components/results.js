import React from 'react'
import _ from 'lodash'

import ResultsTable from './resultsTable'
import MoreResultsButton from './moreResultsButton'

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let data = this.props.data;
    let search = this.props.search;

    let links = data.links;
    let loadMoreButton = null;

    if (links && links.next) {
      loadMoreButton = <MoreResultsButton loadMore={this.props.loadMore} />
    }

    let resultsBody;

    if (_.isEmpty(data) || !search) {
      resultsBody = null;
    } else if (!_.isEmpty(data.foods)) {
      let [foods, isGrams] = processFoods(data.foods, this.props.grams);
      resultsBody = <ResultsTable foods={foods} isGrams={isGrams} />;
    } else {
      resultsBody = <h4 style={{marginTop: '85px'}} className="text-center">No results for {search}</h4>;
    }

    return (
      <div>
        {resultsBody}
        {loadMoreButton}
      </div>
    );
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
