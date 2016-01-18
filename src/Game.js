import { COLORS, TYPES } from './Constants';

export default class Game {
  static generateTiles() {
    let tiles = {};
    COLORS.forEach((color) => {
      Object.keys(TYPES).forEach((type) => {
        let count = TYPES[type];
        for (let i=0; i<count; i+=1) {
          let id = color + '-' + type + '-' + i;
          tiles[id] = ({
            color: color,
            type: type,
            id: id
          });
        }
      });
    });

    return tiles;
  }

  static listAdjancentPositions(x, y) {
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

  static canDragTile(id) {
    return Game.tiles[id].color === Game.turn;
  }

  static canDropTile(id, x, y) {
    if (Game.moveCount === 0) {
      return true;
    }
    return Game.listAdjancentPositions(x, y).some(pos => {
      return Object.keys(Game.tiles).some(id => {
        let tile = Game.tiles[id];
        if (tile.x === pos.x && tile.y === pos.y) {
          return true;
        }
      });
    });
  }

  static moveTile(id, x, y) {
    Game.tiles[id].x = x;
    Game.tiles[id].y = y;
    Game.turn = Game.turn === 'white' ? 'black' : 'white';
    Game.moveCount += 1;
    Game.publish();
  }

  static subscribe(fn) {
    if (Game.listener) {
      throw new Error('Only one listener is supported');
    }
    Game.listener = fn;
  }

  static getState() {
    let tiles = [];
    let unusedWhite = [];
    let unusedBlack = [];
    Object.keys(Game.tiles).forEach((id) => {
      let tile = Game.tiles[id];
      if (typeof tile.x !== 'number' || typeof tile.x !== 'number') {
        if (tile.color === 'white') {
          unusedWhite.push(tile);
        } else {
          unusedBlack.push(tile);
        }
      } else {
        tiles.push(tile);
      }
    });
    return {
      tiles: tiles,
      unusedWhite: unusedWhite,
      unusedBlack: unusedBlack,
      turn: Game.turn,
      moveCount: Game.moveCount
    };
  }

  static publish() {
    if (!Game.listener) {
      return;
    }
    Game.listener(Game.getState());
  }
};

Game.tiles = Game.generateTiles();
Game.listener = null;
Game.turn = 'white';
Game.moveCount = 0;
Game.publish();
