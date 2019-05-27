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

  fetchBinData(){
    db.ref(`bins/${this.props.fbkey}`).once('value').then(snapshot => {
      let bin = snapshot.val();
      this.setState({
        binTypes: bin.types,
        loaded: true
      });
    }
    );
    var strRef = storage.ref();
    strRef.child(`${this.props.fbkey}`).getDownloadURL().then((url) => {
      this.setState({
        binPicSrc: url,
        picLoaded: true
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps) {
    //console.log(this.state.show,prevProps.show);
    if(this.props.show !== prevProps.show)
      this.fetchBinData();
  }

  writeAllBinTypes(){
    if(this.state.loaded == true){
      let types = [];
      for(let i = 0;i<this.state.binTypes.length;i++)
      {
        types.push(
          <div className="tag-container">{this.state.binTypes[i]}</div>
        );
      }
      return types
    }
  }

  checkPicture(){
    if(this.state.picLoaded == false)
      return (
        <div style={{ textAlign: 'center', borderRadius: '10px'}}>
          <img src="http://placekitten.com/260/200"/>
        </div>
      )
    else
      return (
        <div style={{ textAlign: 'center', borderRadius: '10px'}}>
          <img src={this.state.binPicSrc} width='100%' height='100%'/>
        </div>
      )
  }

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
