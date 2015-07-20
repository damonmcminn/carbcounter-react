import React from 'react'

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let food = this.props.food;
    return (
      <tr>
        <td>{food.name}</td>
        <td className="text-right">{food.carbs}</td>
      </tr>
    );
  }
}

export default TableRow;
