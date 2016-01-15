import React from 'react';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
  }
}

Tile.propTypes = {
  color: React.PropTypes.string.isRequired
};
