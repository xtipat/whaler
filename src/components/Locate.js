import React, { Component } from 'react';
import MapPage from '../MapPage.js'
import AddBinInfo from './AddBinInfo.js';
import { NavLink } from 'react-router-dom';
import '../assets/scss/marker.scss';

export default class Locate extends Component {
  constructor(props){
    super(props);
    this.state = {modalShow: false};
    this.handleCenterForAddBin = this.handleCenterForAddBin.bind(this);
    this.handleLocationPinButton = this.handleLocationPinButton.bind(this);
  };
  handleCenterForAddBin(center){
    this.setState({lat:center.lat, lng:center.lng})
  }
  handleLocationPinButton(){
    this.setState({ modalShow: true });
  }
  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return(
      <div>
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
          uid={this.props.uid}
        />
        <div className = 'center-crosshair'/>
        <MapPage
          handleLocationPinButton = {this.handleLocationPinButton.bind(this)}
          handleCenterForAddBin = {this.handleCenterForAddBin.bind(this)}
          isInLocatePage = {true}
        />
      </div>
    );
  }
}
