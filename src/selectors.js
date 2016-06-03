import { createSelector } from 'reselect';
import { generateId } from './utils';

const getTiles = (state) => state.tiles;
const getTile = (state, props) => state.tiles[props.id];
const getTurn = (state) => state.turn;
const getMoveCount = (state) => state.moveCount;
const getDraggedTileId = (state) => state.draggedTileId;
const getX = (state, props) => props.x;
const getY = (state, props) => props.y;

function tileOnBoard(tile) {
  return (typeof tile.x === 'number' && typeof tile.y === 'number');
}

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
  [getTiles, getTurn, getMoveCount, getDraggedTileId, getX, getY],
  (tiles, turn, moveCount, draggedTileId, x, y) => {
    const draggedTile = tiles[draggedTileId];
    if (!draggedTile) {
      return false;
    }
    if (moveCount === 0) {
      return true;
    }
    let hasNeighbor = false;
    let hasColorNeighbor = false;
    listAdjancentPositions(x, y).forEach(pos => {
      const neighborTile = tiles[Object.keys(tiles).find(id => {
        return tiles[id] && (tiles[id].x === pos.x && tiles[id].y === pos.y)
      })];
      if (!neighborTile) {
        return;
      }
      hasNeighbor = true;

      if (neighborTile.color == turn) {
        hasColorNeighbor = true;
      }
      return true;
    });
    if (!hasNeighbor) {
      return false;
    }
    if (moveCount === 1) {
      return true;
    }
    if (!tileOnBoard(draggedTile)) {
      return hasColorNeighbor;
    }
    // Tile movement rules go here
    return false;
  }
);

export const canDragTile = createSelector(
  [getTile, getTurn, getMoveCount, getTiles],
  (tile, turn, moveCount, tiles) => {
    if (tile.color !== turn)
      return false;
    if ((moveCount >= 4) && (!tileOnBoard(tiles[generateId(turn, 'bee', 0)])) && (tile.type !== 'bee')) {
      return false;
    }
    return true;
  }
);

export const getUsedTiles = createSelector(
  [getTiles],
  (tiles) => {
    let usedTiles = [];
    Object.keys(tiles).forEach((id) => {
      let tile = tiles[id];
      if (tileOnBoard(tile)) {
        usedTiles.push(tile);
      }
    });
    return usedTiles;
  }
);

const getUnusedColorTiles = (color) => createSelector(
  [getTiles],
  (tiles) => {
    let colorTiles = [];
    Object.keys(tiles).forEach((id) => {
      let tile = tiles[id];
      if (!tileOnBoard(tile)) {
        if (tile.color === color) {
          colorTiles.push(tile);
        }
      }
    });
    return colorTiles;
  }
);

export const getUnusedWhiteTiles = getUnusedColorTiles('white');
export const getUnusedBlackTiles = getUnusedColorTiles('black');
