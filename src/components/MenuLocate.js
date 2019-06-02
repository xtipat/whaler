import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import '../assets/scss/menubar.scss';

const styles = {
  exMenuM: {
    transform: 'translate(100%, -40%)'
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
        <NavLink to='/locate' onClick={this.props.onClick}>
          <div
          className='extended-menu-wrap'
          style={ styles.exMenuM }
          >
            <FontAwesomeIcon
              icon='compass'
              className='extended-menu-icon'
            />
          <div className='extended-menu-label'>search<br/>area</div>
        </div>
        </NavLink>
      </div>
    );
  }
}
