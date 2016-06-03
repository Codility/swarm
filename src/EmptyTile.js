import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { ITEM_TYPES } from './Constants';
import { canDropTile } from './selectors';
import { actions } from './actions';


class EmptyTile extends React.Component {
  render() {
    let classes = ['c-tile', 'mod-empty', 'hexagon'];
    if (this.props.isOver && this.props.canDropTile) {
      classes.push('mod-isover');
    } else if (this.props.canDropTile) {
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
  canDrop(props) {
    return props.canDropTile;
  },
  drop(props, monitor) {
    props.moveTile(monitor.getItem().id, props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function mapStateToProps(state, props) {
  return {
    canDropTile: canDropTile(state, props)
  }
}

const dispatchToProps = {
  moveTile: actions.moveTile
};

export default connect(mapStateToProps, dispatchToProps)(DropTarget(ITEM_TYPES.TILE, tileTarget, collect)(EmptyTile));

EmptyTile.propTypes = {
  connectDropTarget: React.PropTypes.func.isRequired,
  isOver: React.PropTypes.bool.isRequired,
  canDrop: React.PropTypes.bool.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired
};
