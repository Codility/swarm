import React from 'react';
import Tile from './Tile';

export default class HexLayout extends React.Component {
  getRows(tiles) {
    let components = tiles.map((tile) => {
      return (<Tile id={tile.id} color={tile.color} type={tile.type} key={tile.id}/>);
    });
    return (<div className="c-board-row">{components}</div>);
  }

  render () {
    return (
      <div className="c-board">{this.getRows(this.props.tiles)}</div>
    );
  }
}

HexLayout.propTypes = {
  tiles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
