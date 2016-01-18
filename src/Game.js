import { COLORS, TYPES } from './Constants';

export default class Game {
  static generateTiles() {
    let tiles = [];
    COLORS.forEach((color) => {
      Object.keys(TYPES).forEach((type) => {
        let count = TYPES[type];
        for (let i=0; i<count; i+=1) {
          tiles.push({
            color: color,
            type: type,
            id: i
          });
        }
      });
    });

    return tiles;
  }

  static subscribe(fn) {
    if (Game.listener) {
      throw new Error('Only one listener is supported');
    }
    Game.listener = fn;
  }

  static getState() {
    return {
      tiles: Game.tiles
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
Game.publish();
