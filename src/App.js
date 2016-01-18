import React, { Component } from 'react';
import HexLayout from './HexLayout';
import Board from './Board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Game from './Game';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = Game.getState();
    Game.subscribe(this.setState.bind(this));
  }

  render() {
    return (
      <div>
        <h1>Swarm</h1>
        <h2>Turn: {this.state.turn}, moves done: {this.state.moveCount}</h2>
        <HexLayout tiles={this.state.unusedWhite}/>
        <HexLayout tiles={this.state.unusedBlack}/>
        <Board tiles={this.state.tiles} minRows={8}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
