import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import MapPage from '../MapPage.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBinInfo from './AddBinInfo.js';

const markerStyle = {
  position: 'fixed',
  width: 40,
  height: 40,
  left: '48.7%',
  top: '47.4%',
  zIndex: 100,

  borderRadius: 40,
  backgroundColor: '#000000',
  textAlign: 'center',
  color: 'white',
  fontSize: 16,
  padding: 4
};

const styles = {
  exMenuL: {
    transform: 'translate(-180%, 0)'
  },

  exMenuM: {
    transform: 'translate(-45%, -80%)'
  },

  exMenuR: {
    transform: 'translate(90%, 0)'
  },
};

export default class Locate extends Component {
  constructor(props){
    super(props);
    this.state = {modalShow: false};
    this.handleCenter = this.handleCenter.bind(this)
  };
  handleCenter(center){
    this.setState({lat:center.lat, lng:center.lng})
  }
  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return(
      <div>
        <div
          className='extended-menu-wrap'
          onClick={() => {this.setState({ modalShow: true }); //this.props.onClick() 
        }}
          >
          <FontAwesomeIcon style={markerStyle} icon="map-pin"/>
        </div>
        <AddBinInfo
          show={this.state.modalShow}
          onHide={modalClose}
          lat={this.state.lat}
          lng={this.state.lng}
        />
        <MapPage handleCenter = {this.handleCenter.bind(this)}/>
      </div>
    );
  }
}
