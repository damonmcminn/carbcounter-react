import React from 'react'

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <thead>
        <tr>
          <th>Food</th>
          <th className="text-right">{this.props.isGrams ? 'g' : '%'}</th>
        </tr>
      </thead>
    )
  }
}

export default TableHeader;
