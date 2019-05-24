import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import BinDetails from './BinDetails.js';
import BinInfo from './BinInfo.js'
import '../assets/scss/marker.scss';

class BinMarker extends Component {
  constructor (props) {
    super(props);
    this.state = {modalShow: false};
  }
  static defaultProps = {};
  checkClickable(){
    let modalClose = () => this.setState({ modalShow: false });
    if(this.props.clickable){
      return(
      <div>
      <div className="bin-marker-clickable" onClick={() => this.setState({ modalShow: true })}>
        <FontAwesomeIcon icon={this.props.icon}/>
      </div>
      <BinDetails
        show={this.state.modalShow}
        onHide={modalClose}
        fbkey={this.props.fbkey}
        icon={this.props.icon}
      />
      </div>
      );
    }
    else{
      return(
      <div>
      <div className="bin-marker-not-clickable" onClick={() => this.setState({ modalShow: true })}>
        <FontAwesomeIcon icon={this.props.icon}/>
      </div>
      <BinInfo
        show={this.state.modalShow}
        onHide={modalClose}
        fbkey={this.props.fbkey}
        icon={this.props.icon}
      />
      </div>
      );
    }
  }

  render(){
    return(
      this.checkClickable()
    );
  }
}

export default BinMarker;
