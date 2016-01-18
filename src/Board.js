import React from 'react';
import Tile from './Tile';
import EmptyTile from './EmptyTile';
import HexLayout from './HexLayout';

export default class Board extends HexLayout {
  getRows(tiles) {
    let table = [];
    tiles.forEach((tile) => {
      if (!table[tile.x]) {
        table[tile.x] = [];
      }
      table[tile.x][tile.y] = (<Tile id={tile.id} color={tile.color} type={tile.type} key={tile.id} x={tile.x} y={tile.y}/>);
    });
    let rows = [];
    for (let j=0; j<Board.SIZE; j+=1) {
      let row = [];
      for (let i=0; i<Board.SIZE; i+=1) {
        if (table[i] === undefined || table[i][j] === undefined) {
          row.push(<EmptyTile key={j*Board.SIZE + i} x={i} y={j}/>);
        } else {
          row.push(table[i][j]);
        }
      }
      rows.push(<div className="c-board-row" key={j}>{row}</div>);
    }
    return rows;
  }
}

Board.SIZE = 12;
