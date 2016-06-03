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

function directionalAdjancentPositions(x, y) {
  let directions = {
    y: [
      {x: x, y: y - 1},
      {x: x, y: y + 1}
    ]
  };
  if (x % 2) {
    directions['x'] = [
      {x: x - 1, y: y},
      {x: x + 1, y: y + 1}
    ];
    directions['z'] = [
      {x: x - 1, y: y + 1},
      {x: x + 1, y: y}
    ];
  } else {
    directions['x'] = [
      {x: x - 1, y: y - 1},
      {x: x + 1, y: y}
    ];
    directions['z'] = [
      {x: x - 1, y: y},
      {x: x + 1, y: y - 1}
    ]
  }
  return directions;
}

function listAdjancentPositions(x, y) {
  const directional = directionalAdjancentPositions(x, y);
  return [].concat(directional['x'], directional['y'], directional['z']);
}

function tileByPosition(tiles, pos) { // needs optimization
  return tiles[Object.keys(tiles).find(id =>
    tiles[id] && (tiles[id].x === pos.x && tiles[id].y === pos.y)
  )];
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
    let draggedIsNeighbor = false;
    listAdjancentPositions(x, y).forEach(pos => {
      const neighborTile = tileByPosition(tiles, pos);
      if (!neighborTile) {
        return;
      }
      if (neighborTile.color === turn) {
        hasColorNeighbor = true;
      }
      if (neighborTile.id === draggedTile.id) {
        draggedIsNeighbor = true;
      } else {
        hasNeighbor = true;
      }
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
    if (draggedTile.type === 'bee') {
      return draggedIsNeighbor;
    } else if (draggedTile.type === 'ant') {
      return true;
    } else if (draggedTile.type === 'grasshopper') {
      return true; // Tile movement rules go here
    } else if (draggedTile.type === 'spider') {
      return true; // Tile movement rules go here
    }
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
