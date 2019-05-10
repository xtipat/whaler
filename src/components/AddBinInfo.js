import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import ProgressBar from 'react-bootstrap/ProgressBar'
import MapPage from '../MapPage.js';
import '../assets/scss/modal.scss';
import { Modal, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import TagInput from './TagInput';
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
          Add a New Bin: 
        </Modal.Header>
        /* below lat,lng will be used */
        <span> Lat={this.props.lat} Lng={this.props.lng} </span>
        <Modal.Body>
          <div style={{textAlign: 'center'}}>
            <div class="add-photo">
              <FontAwesomeIcon icon='plus-circle' size="2x"/>
              <br></br>
              Attach a Photo
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>Bin Types</div>
            <TagInput/>
            <br></br>
            <Button variant="yellow">Submit</Button>
            <hr/>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
