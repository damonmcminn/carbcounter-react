import React from 'react'

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h4 style={{marginTop: '85px'}} className="text-center">Retrieving results for {this.props.search}</h4>
    )
  }
}

export default Loading;
