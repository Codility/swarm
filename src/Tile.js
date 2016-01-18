import React from 'react';
import { DragSource } from 'react-dnd';
import { ITEM_TYPES } from './Constants';

const tileSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Tile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-' + this.props.color, 'mod-' + this.props.type, 'hexagon'];

    if (this.props.isDragging) {
      classes.push('mod-dragging');
    }

    return this.props.connectDragSource(
      <div className={classes.join(' ')}>
        <div className="hexagontent">{this.props.type}</div>
      </div>
    );
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired
};

export default DragSource(ITEM_TYPES.TILE, tileSource, collect)(Tile);
