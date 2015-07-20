import React from 'react'
import _ from 'lodash'

import FoodFetcher from '../utils/FoodFetcher'

import Title from './title'
import SearchForm from './searchForm'
import Results from './results'
import Notification from './notification'

const maxWidth = {maxWidth: 500};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      search: undefined,
      grams: undefined,
      loading: false
    };
    // binding
    this.findFood = this.findFood.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  render() {
    let actions = {
      findFood: this.findFood,
      clearSearch: this.clearSearch,
      handleChange: this.handleChange
    };

    let vals = {
      search: this.state.search,
      grams: this.state.grams
    }

    return (
      <div className="container" style={maxWidth}>
        <Title name="Carb Counter" />
        <SearchForm actions={actions} inputVals={vals} />
        <Notification error={this.state.error} loading={this.state.loading} search={this.state.search}/>
        <Results
          data={this.state.data}
          grams={this.state.grams}
          search={this.state.search}
          loading={this.state.loading}
          loadMore={this.loadMore}
        />
      </div>
    )
  }
  findFood(food, grams) {
    this.setState({
      loading: true,
      search: food
    });

    let state = {
      grams,
      loading: false
    };

    FoodFetcher.search(food)
      .then(data => {
        state.data = data;
        this.setState(state);
      })
      .catch(err => {
        state.error = true;
        this.setState(state);
      });
  }
  clearSearch() {
    this.setState({
      data: {},
      search: undefined,
      grams: undefined
    })
  }
  handleChange(grams) {
    this.setState({
      grams
    });
  }
  loadMore() {
    this.setState({loading: true});

    FoodFetcher.next(this.state.data.links.next)
      .then(data => {
        data.foods = this.state.data.foods.concat(data.foods);

        this.setState({
          // concat only if retrieving more results
          data,
          loading: false
        });

      })
  }
}

export default App;
