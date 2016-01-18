import React from 'react';

export default class Tile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-' + this.props.color, 'mod-' + this.props.type, 'hexagon'];
    return <div className={classes.join(' ')}><div className="hexagontent">{this.props.type}</div></div>;
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
};
