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
      <div class="bin-marker-clickable" onClick={() => this.setState({ modalShow: true })}>
        <FontAwesomeIcon icon={this.props.icon}/>
      </div>
      );
    else{
      return(
      <div class="bin-marker-not-clickable">
        <FontAwesomeIcon icon={this.props.icon}/>
      </div>
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
