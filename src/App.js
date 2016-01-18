import React, { Component } from 'react';
import Board from './Board';

export default class App extends Component {
  static generateTiles() {
    let tiles = [];
    App.COLORS.forEach((color) => {
      Object.keys(App.TYPES).forEach((type) => {
        let count = App.TYPES[type];
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
      turn: App.COLORS[0]
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

App.COLORS = ['white', 'black'];
App.TYPES = {
  ant: 3,
  grasshopper: 3,
  beetle: 2,
  spider: 2,
  bee: 1
};
