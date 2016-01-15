import React from 'react';

export default class Tile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-' + this.props.color, 'mod-' + this.props.type];
    return <div className={classes.join(' ')}>{this.props.type}</div>;
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
};
