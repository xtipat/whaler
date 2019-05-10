import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt, faGift, faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../assets/scss/menubar.scss';
import Locate from './Locate.js';

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

export default class MenuLocate extends React.Component{
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
        style={ styles.exMenuM }
        onClick={() => this.setState({ modalShow: true })}
        >
          <FontAwesomeIcon
            icon='compass'
            className='extended-menu-icon'
            size='2x'
          />
          <div className='extended-menu-label'>here</div>
        </div>
        <Locate
          show={this.state.modalShow}
          onHide={modalClose}
          fbkey={this.props.fbkey}
        />
      </div>
    );
  }
}
