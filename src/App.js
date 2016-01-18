import React, { Component } from 'react';
import Board from './Board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { COLORS, TYPES } from './Constants'

class App extends Component {
  static generateTiles() {
    let tiles = [];
    COLORS.forEach((color) => {
      Object.keys(TYPES).forEach((type) => {
        let count = TYPES[type];
        for (let i=0; i<count; i+=1) {
          tiles.push({
            color: color,
            type: type,
            id: i
          });
        }
      });
    });

    return tiles;
  }
  constructor(props) {
    super(props);

    this.state = {
      used: [],
      unused: App.generateTiles(),
      turn: COLORS[0]
    };
  }

  addFirst() {
    let unused = this.state.unused.slice();
    let tile = unused.pop();
    tile.x = 0;
    tile.y = 0;
    let used = this.state.used.slice();
    used.push(tile);
    this.setState({
      'used': used,
      'unused': unused
    });
  }

  render() {
    return (
      <div>
        <h1>Swarm</h1>
        <Board tiles={this.state.unused}/>
        <button onClick={this.addFirst.bind(this)}>Add First</button>
        <Board tiles={this.state.used} minRows={8}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
