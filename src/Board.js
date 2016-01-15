import React from 'react';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
  }
  add(tile, x, y) {
    let tiles = this.state.tiles.slice();
    tile.setPosition(x, y);
    tiles.push(tile);
    this.setState({tiles: tiles});
  }
  render() {
    return (
      <div className="c-board">{this.state.tiles}</div>
    );
  }
}
