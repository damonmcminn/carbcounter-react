import React from 'react'

const fullWidth = {width: '100%'}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    // binding
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearchClick = this.clearSearchClick.bind(this);
  }
  render() {
    return (
      <form role="form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Food</label>
          <input
            type="text"
            className="form-control"
            placeholder="polar bear"
            ref="foodInput"
            required="true"
          />
        </div>
        <div className="form-group">
          <label>Weight in Grams</label>
          <input
            type="number"
            className="form-control"
            min={1}
            placeholder="Optional"
            ref="gramsInput"
            value={this.props.inputVals.grams}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-xs-6" style={{padding: 0}}>
          <button
            type="submit"
            className='btn btn-primary'
            style={fullWidth}
          >
            Find Food
          </button>
        </div>
        <div className="col-xs-6" style={{padding: 0}}>
          <button
            type="button"
            onClick={this.clearSearchClick}
            className='btn btn-default'
            style={fullWidth}
            ref="clearSearchButton"
          >
            Clear Search
          </button>
        </div>
      </form>
    );
  }
  onSubmit(e) {
    e.preventDefault();
    let [food, grams] = getVals(this);
    this.props.actions.findFood(food, grams);
  }
  handleChange() {
    let [food, grams] = getVals(this);
    this.props.actions.handleChange(grams);
  }
  clearSearchClick() {
    // explicitly unset focus from button... why?!?!
    this.refs.clearSearchButton.getDOMNode().blur();
    this.props.actions.clearSearch();
    // directly mutating state here...
    this.refs.foodInput.getDOMNode().value = '';
  }
}

function getVals(self) {
  let food = self.refs.foodInput.getDOMNode().value;
  let gramsNode = self.refs.gramsInput.getDOMNode();
  let grams = gramsNode.value ? +gramsNode.value : undefined;
  return [food, grams];
}

export default SearchForm;
