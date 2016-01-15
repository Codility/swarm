import React from 'react';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>;
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired
};
