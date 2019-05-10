import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import MapPage from '../MapPage.js';
import '../assets/scss/modal.scss';

export default class AddBinInfo extends Component {
  constructor(props){
    super(props);
  };

  render(){
    return(
      <Modal
        size="sm"
        {...this.props}
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {this.props.lat}
          <hr/>
          {this.props.lng}
        </Modal.Body>
      </Modal>
    );
  }
}
