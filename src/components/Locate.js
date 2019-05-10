import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class Locate extends Component {
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
        </Modal.Body>
      </Modal>
    );
  }
}
