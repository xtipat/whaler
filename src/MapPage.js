import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const markerStyle = {
  position: 'absolute',
  width: 40,
  height: 40,
  left: -20,
  top: -20,

  border: '5px solid #f44336',
  borderRadius: 40,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

class BinMarker extends Component {

  static defaultProps = {};

  render(){
    return(
      <div style={markerStyle}>
        {this.props.text}
      </div>
    );
  }
}

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
            lng={30.337844}
            text='test'/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapPage;
