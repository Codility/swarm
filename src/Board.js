import React from 'react';
import Tile from './Tile';
import EmptyTile from './EmptyTile';

export default class Board extends React.Component {
  render() {
    let components = this.props.tiles.map((tile) => {
      return (<Tile color={tile.color} type={tile.type} key={tile.color + tile.type + tile.id}/>);
    });

    let rows = [], len=Math.max(components.length, this.props.minRows ? this.props.minRows*Board.ROW_SIZE : 0);
    for (let i=0; i < len; i += Board.ROW_SIZE) {
      let componentsSlice = components.slice(i, i + Board.ROW_SIZE);
      while (componentsSlice.length < Board.ROW_SIZE) {
        componentsSlice.push(<EmptyTile key={i + componentsSlice.length}/>);
      }
      rows.push(<div className="c-board-row" key={i}>{componentsSlice}</div>);
    }
    return (
      <div className="c-board">{rows}</div>
    );
  }
}

Board.propTypes = {
  tiles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  minRows: React.PropTypes.number
};
Board.ROW_SIZE = 8;
