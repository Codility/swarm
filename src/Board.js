import React from 'react';
import Tile from './Tile';

export default class Board extends React.Component {
  render() {
    let components = this.props.tiles.map((tile) => {
      return (<Tile color={tile.color} type={tile.type} key={tile.color + tile.type + tile.id}/>);
    });

    let rows = [];
    for (let i=0, len=components.length; i < len; i += Board.ROW_SIZE) {
      rows.push(<div className="c-board-row" key={i}>{components.slice(i, i + Board.ROW_SIZE)}</div>);
    }
    return (
      <div className="c-board">{rows}</div>
    );
  }
}

Board.propTypes = {
  tiles: React.PropTypes.arrayOf(React.PropTypes.object)
};
Board.ROW_SIZE = 8;
