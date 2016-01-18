import React from 'react';
import { DropTarget } from 'react-dnd';
import { ITEM_TYPES } from './Constants';


class EmptyTile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-empty', 'hexagon'];
    if (this.props.isOver) {
      classes.push('mod-isover');
    }
    return this.props.connectDropTarget(
      <div className={classes.join(' ')}>
        <div className="hexagontent"></div>
      </div>
    );
  }
}

const tileTarget = {
  drop(props) {
    console.log('Dropped on target', props);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(ITEM_TYPES.TILE, tileTarget, collect)(EmptyTile);

EmptyTile.propTypes = {
  connectDropTarget: React.PropTypes.func.isRequired,
  isOver: React.PropTypes.bool.isRequired
};
