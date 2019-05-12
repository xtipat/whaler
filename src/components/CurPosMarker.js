import React, { Component } from 'react';
import '../assets/scss/marker.scss';

export default class CurPosMarker extends Component {
  constructor (props) {
    super(props);
  }
  static defaultProps = {};

  render(){
    return(
      <div class="outer-circle">
        <div class="inner-circle"></div>
      </div>
    );
  }
}
