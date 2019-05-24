import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const markerStyle = {
  position: 'fixed',
  width: 40,
  height: 40,
  left: '50%',
  top: '50%',
  zIndex: 100,

  borderRadius: 40,
  backgroundColor: 'gray',
  textAlign: 'center',
  color: 'white',
  fontSize: 16,
  padding: 4
};

class HomeButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func
  };

  static defaultProps = {
    clickHandler: () => {},
  };

  render(){
    return(
        <div onClick={this.props.clickHandler()}>
          <FontAwesomeIcon style={markerStyle} icon="home"/>
        </div>
      );
  }
}

export default HomeButton