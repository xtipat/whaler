import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

const markerStyle = {
  position: 'absolute',
  width: 40,
  height: 40,
  left: -20,
  top: -20,

  border: '5px solid #f44336',
  borderRadius: 40,
  backgroundColor: '#f44336',
  textAlign: 'center',
  color: 'white',
  fontSize: 16,
  padding: 4
};

class BinMarker extends Component {

  static defaultProps = {};

  render(){
    return(
      <div style={markerStyle}>
        <FontAwesomeIcon icon='trash'/>
      </div>
    );
  }
}

export default BinMarker;
