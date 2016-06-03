import { createSelector } from 'reselect';

const getTiles = (state) => state.tiles;
const getTile = (state, props) => state.tiles[props.id];
const getTurn = (state) => state.turn;
const getMoveCount = (state) => state.moveCount;
const getDraggedTileId = (state) => state.draggedTileId;
const getX = (state, props) => props.x;
const getY = (state, props) => props.y;

const getUnusedColorTiles = (color) => createSelector(
  [getTiles],
  (tiles) => {
    let colorTiles = [];
    Object.keys(tiles).forEach((id) => {
      let tile = tiles[id];
      if (typeof tile.x !== 'number' || typeof tile.y !== 'number') {
        if (tile.color === color) {
          colorTiles.push(tile);
        }
      }
    });
    return colorTiles;
  }
);

function listAdjancentPositions(x, y) {
  let positions = [
    {x: x + 1, y: y},
    {x: x - 1, y: y},
    {x: x, y: y + 1},
    {x: x, y: y - 1}
  ];

  if (x % 2) {
    positions.push({x: x + 1, y: y + 1});
    positions.push({x: x - 1, y: y + 1});
  } else {
    positions.push({x: x + 1, y: y - 1});
    positions.push({x: x - 1, y: y - 1});
  }
  return positions;
}

export const canDropTile = createSelector(
  [getTiles, getMoveCount, getDraggedTileId, getX, getY],
  (tiles, moveCount, draggedTileId, x, y) => {
    if (moveCount === 0)
      return true;
    return listAdjancentPositions(x, y).some(pos => {
      return Object.keys(tiles).some(id => {
        let tile = tiles[id];
        if (tile.x === pos.x && tile.y === pos.y) {
          return true;
        }
      });
    });
  }
);

export const canDragTile = createSelector(
  [getTile, getTurn],
  (tile, turn) => tile.color === turn
);

export const getUsedTiles = createSelector(
  [getTiles],
  (tiles) => {
    let usedTiles = [];
    Object.keys(tiles).forEach((id) => {
      let tile = tiles[id];
      if (typeof tile.x === 'number' && typeof tile.y === 'number') {
        usedTiles.push(tile);
      }
    });
    return usedTiles;
  }
);

export const getUnusedWhiteTiles = getUnusedColorTiles('white');
export const getUnusedBlackTiles = getUnusedColorTiles('black');
