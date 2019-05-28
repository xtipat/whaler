import React, { Component } from 'react';
import { db, storage, firebaseConfig } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import MapPage from '../MapPage.js';
import Loader from './Loader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "@react-firebase/database";
import '../assets/scss/modal.scss';

const styles = {
  modalContentWrap: {
    background: 'white',
    width: '100%',
    padding: '20px',
  },
  colors: {
    primary: '#FEC93F'
  }
}

export default class BinInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      picLoaded: false,
      loaded: false,
      show: false
    };
  };

  detailsContents(){
    return(
      <div>
        {this.checkPicture()}
        <div className="bintypes-container">
          <div className='modal-content-title'>Bin Type</div>
            <div className='tag-wrap'>
              {this.writeAllBinTypes()}
            </div>
        </div>
      </div>
    );
  }


  render() {
    if(this.state.loaded){
      return (
        <Modal
          size="sm"
          {...this.props}
          centered
        >
          <Tab.Container defaultActiveKey="details">
            <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
              <div style={{ textAlign: 'right', width: '100%'}}>
                <div className='custom-close-wrap' onClick={ this.props.onHide }>
                  <div className='custom-close-label'>close</div>
                  <FontAwesomeIcon icon='times-circle' className='custom-close-icon'/>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body style={{ padding: 0, background: styles.colors.primary }}>
              <Tab.Content>
                <Tab.Pane eventKey="details" style={ styles.modalContentWrap }>
                  {this.detailsContents()}
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      );
    }
    else{
      //TO BE REPLACED WITH LOADING SCREEN
      if (this.props.show){
        return(
          <Modal size="sm" {...this.props} centered>
            <Loader primary />
          </Modal>
        )
      }
      else
        return(null)
    }
  }
}
