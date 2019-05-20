import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import MapPage from '../MapPage.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBinInfo from './AddBinInfo.js';
import { NavLink } from 'react-router-dom';
import '../assets/scss/marker.scss';

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
        <div className='locate-marker-container'
          onClick={() => {this.setState({ modalShow: true }); //this.props.onClick() 
        }}
          >
          <span className='locate-text'>Mark Here</span>
          <FontAwesomeIcon icon="map-pin"/>
        </div>
        <NavLink exact to='/'>
          <div className='back-button'>
            Go Back
          </div>
        </NavLink>
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
