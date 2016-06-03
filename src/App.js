import React, { Component } from 'react';
import HexLayout from './HexLayout';
import Board from './Board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { getUsedTiles, getUnusedWhiteTiles, getUnusedBlackTiles } from './selectors';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Swarm</h1>
        <h2>Turn: {this.props.turn}, moves done: {this.props.moveCount}</h2>
        <HexLayout tiles={this.props.unusedWhite}/>
        <HexLayout tiles={this.props.unusedBlack}/>
        <Board tiles={this.props.tiles} minRows={8}/>
        <h4> Icons by <a href="https://thenounproject.com/WSD/">Anton Gajdosik</a></h4>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    turn: state.turn,
    moveCount: state.moveCount,
    unusedWhite: getUnusedWhiteTiles(state),
    unusedBlack: getUnusedBlackTiles(state),
    tiles: getUsedTiles(state)
  }
}

const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(DragDropContext(HTML5Backend)(App));

/* TODO rules to implement
*
* bee movement
* grasshopper movement
* spider movement
* don't squeeze through gaps
* no legal move -> skip turn
*
* one hive
*
* win/draw condition
*
* add beetle
*
* */
