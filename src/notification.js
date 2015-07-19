import React from 'react'

import Loading from './loading'

class Notification extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let loading = this.props.loading ? <Loading search={this.props.search}/> : null;
    if (this.props.loading) {
      return <Loading search={this.props.search}/>;
    } else if (this.props.error) {
      return <h4 style={{marginTop: '85px'}} className="text-center">There was an error contacting the server</h4>;
    } else {
      return null;
    }
  }
}

export default Notification;
