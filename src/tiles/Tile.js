import React from 'react';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let classes = ['c-tile', 'mod-' + this.props.color, 'mod-' + this.constructor.name.toLocaleLowerCase()];
    return <div className={classes.join(' ')}>{this.constructor.name}</div>;
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired
};
