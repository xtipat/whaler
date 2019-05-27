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
  static defaultProps = {
    isClickable: true
  };
  static defaultProps = {};
  checkIsAccepted(){
    let modalClose = () => this.setState({ modalShow: false });
    let onClickHandler = () => this.setState({ modalShow: true });
    let cssClickableClass = "";
    if(this.props.isClickable == false) { onClickHandler = () => {}; cssClickableClass = " un-clickable";}
    if(this.props.isAccepted){
      return(
      <div>
      <div className={"bin-marker-accepted"+cssClickableClass} onClick={onClickHandler}>
        <FontAwesomeIcon icon={this.props.icon}/>
      </div>
        <BinInfo
          show={this.state.modalShow}
          onHide={modalClose}
          fbkey={this.props.fbkey}
          icon={this.props.icon}
          uid={this.props.uid}
        />
      </div>
      );
    }
    else{
      return(
      <div>
      <div className={"bin-marker-not-accepted"+cssClickableClass} onClick={onClickHandler}>
        <FontAwesomeIcon icon={this.props.icon}/>
      </div>
      <BinDetails
        show={this.state.modalShow}
        onHide={modalClose}
        fbkey={this.props.fbkey}
        icon={this.props.icon}
        uid={this.props.uid}
      />
      </div>
      );
    }
  }

  render(){
    return(
      this.checkIsAccepted()
    );
  }
}

export default BinMarker;
