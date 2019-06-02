import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import '../assets/scss/marker.scss';

export default class LocateMarker extends Component {
  static defaultProps = {};

  render(){
    return(
        <div className='locate-marker-container'
          onClick={this.props.handleLocationPinButton}
          >
          <span className='locate-text'>Click here to add bin</span>
          <FontAwesomeIcon icon="crosshairs"/>
        </div>
    );
  }
}
