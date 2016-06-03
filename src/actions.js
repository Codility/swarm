export const actionTypes = {
  BEGIN_DRAG: 'BEGIN_DRAG',
  END_DRAG: 'END_DRAG',
  MOVE_TILE: 'MOVE_TILE'
};

export const actions = {
  beginDrag: (tileId) => ({
    type: actionTypes.BEGIN_DRAG,
    tileId: tileId
  }),
  endDrag: () => ({
    type: actionTypes.END_DRAG
  }),
  moveTile: (tileId, x, y) => ({
    type: actionTypes.MOVE_TILE,
    tileId: tileId,
    x: x,
    y: y
  })
};
