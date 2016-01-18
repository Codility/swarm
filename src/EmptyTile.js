import React from 'react';

export default class EmptyTile extends React.Component {
  render() {
    let classes = ['c-tile', 'hexanone'];
    return <div className={classes.join(' ')}><div className="hexagontent"></div></div>;
  }
}
