import React from 'react'

class MoreResultsButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        type="reset"
        onClick={this.props.loadMore}
        className='btn btn-default'
        style={{width: '100%', marginBottom: 21}}
      >
        Load More Results
      </button>
    )
  }
}

export default MoreResultsButton;
