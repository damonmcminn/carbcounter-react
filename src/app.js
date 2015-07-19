import React from 'react'
import _ from 'lodash'

import API from './API'

import Title from './title'
import SearchForm from './searchForm'
import Results from './results'
import Loading from './loading'
import MoreResultsButton from './moreResultsButton'

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

    let loading = this.state.loading ? <Loading search={this.state.search}/> : null;
    let links = this.state.data.links;
    let loadMoreButton = null;

    if (links && links.next) {
      loadMoreButton = <MoreResultsButton loadMore={this.loadMore} />
    }

    return (
      <div className="container" style={maxWidth}>
        <Title name="Carb Counter" />
        <SearchForm actions={actions} inputVals={vals} />
        {loading}
        <Results data={this.state.data} grams={this.state.grams} search={this.state.search}/>
        {loadMoreButton}
      </div>
    )
  }
  findFood(food, grams) {
    this.setState({
      loading: true,
      search: food
    });
    API.foodSearch(food, (err, data) => {
      this.setState({
        // concat only if retrieving more results
        data,
        grams,
        loading: false
      })
    })
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
    API.nextResults(this.state.data.links.next, (err, data) => {
      data.foods = this.state.data.foods.concat(data.foods);
      this.setState({
        // concat only if retrieving more results
        data,
        loading: false
      });
    });
  }
}

export default App;
