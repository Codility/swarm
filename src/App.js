import React, { Component } from 'react';
import Tile from './Tile';

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
    let unusedComponents = this.state.unused.map((tile) => {
      return (<Tile color={tile.color} type={tile.type} key={tile.color + tile.type + tile.id}/>);
    });
    let usedComponents = this.state.used.map((tile) => {
      return (<Tile color={tile.color} type={tile.type} key={tile.color + tile.type + tile.id}/>);
    });
    return (
      <div>
        <h1>Hello, world.</h1>
        <div>
          {unusedComponents}
        </div>
        <button onClick={this.addFirst.bind(this)}>Add First</button>
        <div>
          {usedComponents}
        </div>
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
