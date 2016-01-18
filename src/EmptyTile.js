import React from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from './Constants';
import Game from './Game';


class EmptyTile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-empty', 'hexagon'];
    if (this.props.isOver && this.props.canDrop) {
      classes.push('mod-isover');
    } else if (this.props.canDrop) {
      classes.push('mod-allowed');
    }
    return this.props.connectDropTarget(
      <div className={classes.join(' ')}>
        <div className="hexagontent"></div>
      </div>
    );
  }
}

const tileTarget = {
  canDrop(props, monitor) {
    return Game.canDropTile(monitor.getItem().id, props.x, props.y);
  },
  drop(props, monitor) {
    Game.moveTile(monitor.getItem().id, props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export default DropTarget(ITEM_TYPES.TILE, tileTarget, collect)(EmptyTile);

EmptyTile.propTypes = {
  connectDropTarget: React.PropTypes.func.isRequired,
  isOver: React.PropTypes.bool.isRequired,
  canDrop: React.PropTypes.bool.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
