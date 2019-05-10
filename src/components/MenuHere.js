import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt, faGift, faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../assets/scss/menubar.scss';
import AddBinInfo from './AddBinInfo.js';

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

export default class MenuHere extends React.Component{
  constructor (props){
    super(props);
    this.state = {modalShow: false};
  }
  static defaultProps = {};
  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return(
      <div>
        <div
        className='extended-menu-wrap'
        style={ styles.exMenuL }
        onClick={() => this.setState({ modalShow: true })}
        >
          <FontAwesomeIcon
            icon='map-pin'
            className='extended-menu-icon'
            size='2x'
          />
          <div className='extended-menu-label'>here</div>
        </div>
        <AddBinInfo
          show={this.state.modalShow}
          onHide={modalClose}
          fbkey={this.props.fbkey}
        />
      </div>
    );
  }
}
