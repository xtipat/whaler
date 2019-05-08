import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BinMarker from './components/BinMarker.js';

class MapPage extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <BinMarker
            lat={59.955413}
            lng={30.337844}/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapPage;
