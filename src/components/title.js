import React from 'react'

const Title = React.createClass({
  render() {
    return (
      <div className="text-center">
        <h2>{this.props.name}</h2>
      </div>
    );
  }
});

export default Title;
