import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
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
    return(
      <div>
        <NavLink to='/locate' className='icon-default' activeClassName='icon-active' onClick={this.props.onClick}>
          <div
          className='extended-menu-wrap'
          style={ styles.exMenuM }
          >
            <FontAwesomeIcon
              icon='compass'
              className='extended-menu-icon'
              size='2x'
            />
          <div className='extended-menu-label'>locate</div>
        </div>
        </NavLink>
      </div>
    );
  }
}
