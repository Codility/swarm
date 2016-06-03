import React from 'react';
import { DragSource } from 'react-dnd';
import { ITEM_TYPES } from './Constants';
import { connect } from 'react-redux';
import { canDragTile } from './selectors';
import { actions } from './actions';

const tileSource = {
  canDrag(props) {
    return props.canDragTile
  },
  beginDrag(props) {
    props.beginDrag(props.id);
    return {
      id: props.id
    };
  },
  endDrag(props) {
    props.endDrag();
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  };
}

const iconMapping = {
  ant: 'j',
  grasshopper: 'i',
  beetle: 'a',
  spider: 'k',
  bee: 'g',
  mosquito: 'b',
  ladybug: 'd'
};

class Tile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-' + this.props.color, 'mod-' + this.props.type, 'hexagon'];
    if (this.props.canDrag) {
      classes.push('mod-full');
    }

    if (this.props.isDragging) {
      classes.push('mod-dragging');
    }

    return this.props.connectDragSource(
      <div className={classes.join(' ')}>
        <div className="hexagontent">{iconMapping[this.props.type]}</div>
      </div>
    );
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  canDrag: React.PropTypes.bool.isRequired,
  canDragTile: React.PropTypes.bool.isRequired
};

function mapStateToProps(state, props) {
  return {
    canDragTile: canDragTile(state, props)
  }
}

const dispatchToProps = {
  beginDrag: actions.beginDrag,
  endDrag: actions.endDrag
};

export default connect(mapStateToProps, dispatchToProps)(DragSource(ITEM_TYPES.TILE, tileSource, collect)(Tile));
