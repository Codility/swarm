import React, { Component } from 'react';
import Ant from './tiles/Ant'
import Bee from './tiles/Bee'
import Beetle from './tiles/Beetle'
import Grasshopper from './tiles/Grasshopper'
import Spider from './tiles/Spider'

export default class App extends Component {
  static generateColor(color) {
    return [
      <Bee color={color} />,
      <Spider color={color} />,
      <Spider color={color} />,
      <Ant color={color} />,
      <Ant color={color} />,
      <Ant color={color} />,
      <Beetle color={color} />,
      <Beetle color={color} />,
      <Grasshopper color={color} />,
      <Grasshopper color={color} />,
      <Grasshopper color={color} />
    ];
  }
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      unused: App.COLORS.map(color => App.generateColor(color)),
      turn: App.COLORS[0]
    };
  }
  render() {
    return ( <div>
      <h1>Hello, world.</h1>
      <div>
        {this.state.unused}
      </div>
      </div>
    );
  }
}

App.COLORS = ['white', 'black'];
