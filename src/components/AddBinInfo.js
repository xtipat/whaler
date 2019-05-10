import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default class AddBinInfo extends Component {
  render(){
    return(
      <Modal
        size="sm"
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
