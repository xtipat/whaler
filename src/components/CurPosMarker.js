import React, { Component } from 'react';
import '../assets/scss/marker.scss';

export default class CurPosMarker extends Component {
  constructor (props) {
    super(props);
  }
  static defaultProps = {};

  render(){
    return(
      <div className="outer-circle">
        <div className="inner-circle"></div>
      </div>
    );
  }
}
