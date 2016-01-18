import React, { Component } from 'react';
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
        <Board tiles={this.state.unusedTiles}/>
        <Board tiles={this.state.tiles} minRows={8}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
