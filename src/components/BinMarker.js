import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import BinDetails from './Modal.js';

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
  constructor () {
  super();
  this.state = {modalShow: false};

  }
  static defaultProps = {};


  render(){
    let modalClose = () => this.setState({ modalShow: false });

    return(
      <div>
      <button style={markerStyle} onClick={() => this.setState({ modalShow: true })}>
        <FontAwesomeIcon icon='trash'/>
      </button>
      <BinDetails
        show={this.state.modalShow}
        onHide={modalClose}
      />
      </div>
    );
  }
}

export default BinMarker;
