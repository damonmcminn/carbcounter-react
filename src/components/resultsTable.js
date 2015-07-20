import React from 'react'

import TableHeader from './resultsTableHeader'
import TableRow from './resultsTableRow'

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{marginTop: '85px'}}>
        <table className="table">
          <TableHeader isGrams={this.props.isGrams} />
          <tbody>
            {this.props.foods.map(food => {
              return <TableRow key={food.name} food={food} />
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResultsTable;
