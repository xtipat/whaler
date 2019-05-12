import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import BinDetails from './BinDetails.js';
import '../assets/scss/marker.scss';

class BinMarker extends Component {
  constructor (props) {
    super(props);
    this.state = {modalShow: false};
  }
  static defaultProps = {};
  checkClickable(){
    if(this.props.clickable)
      return(
      <button class="bin-marker-clickable" onClick={() => this.setState({ modalShow: true })}>
        <FontAwesomeIcon icon={this.props.icon}/>
      </button>
      );
    else{
      return(
      <button class="bin-marker-not-clickable">
        <FontAwesomeIcon icon={this.props.icon}/>
      </button>
      );
    }
  }
  render(){
    let modalClose = () => this.setState({ modalShow: false });
    return(
      <div>
      {this.checkClickable()}
      <BinDetails
        show={this.state.modalShow}
        onHide={modalClose}
        fbkey={this.props.fbkey}
        icon={this.props.icon}
      />
      </div>
    );
  }
}

export default BinMarker;
