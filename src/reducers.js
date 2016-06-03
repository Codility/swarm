import { combineReducers } from 'redux';
import { COLORS, TYPES } from './Constants';
import { actionTypes } from './actions';

function generateTiles() {
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

const tilesReducer = (state, action) => {
  if (state === undefined) {
    state = generateTiles()
  }
  switch (action.type) {
    case actionTypes.MOVE_TILE:
      return Object.assign({}, state, {
        [action.tileId]: Object.assign({}, state[action.tileId], {
          x: action.x,
          y: action.y
        })
      });
    default:
      return state;
  }
};

const turnReducer = (state='white', action) => {
  switch (action.type) {
    case actionTypes.MOVE_TILE:
      return state === 'white' ? 'black' : 'white';
    default:
      return state;
  }
};

const moveCountReducer = (state=0, action) => {
  switch (action.type) {
    case actionTypes.MOVE_TILE:
      return state + 1;
    default:
      return state;
  }
};

const draggedTileIdReducer = (state=null, action) => {
  switch (action.type) {
    case actionTypes.BEGIN_DRAG:
      return action.tileId;
    case actionTypes.END_DRAG:
      return null;
    default:
      return state;
  }
};

const swarmReducer = combineReducers({
  tiles: tilesReducer,
  turn: turnReducer,
  moveCount: moveCountReducer,
  draggedTileId: draggedTileIdReducer
});

export default swarmReducer
