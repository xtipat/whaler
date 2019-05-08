import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BinMarker from './components/BinMarker.js';
import {db} from './firebase/firebase.js';
class MapPage extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  constructor(props){
    super(props);
    this.state = {
        loading: null,
        markers: []
    };
  };

  fetchBinsData(){
    this.setState({
      loaded: false,
      loading: true
    });
    db.ref(`bins`).once('value').then(snapshot => {
      snapshot.forEach((child) => {
        this.setState({
          markers: this.state.markers.concat(child.val().location)
        });
      });
      this.setState({
      loading: false,
      loaded: true
      })
      }
    );
  }

  componentDidMount() {
    this.fetchBinsData();
  }

  markBins(){
    let markers = [];
    for(let i = 0;i<this.state.markers.length;i++)
    {
      markers.push(
        <BinMarker
        lat={this.state.markers[i].lat}
        lng={this.state.markers[i].lng}/>
      );
    }
    return markers
  }

  render() {
    if(this.state.loaded)
    {
      return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {this.markBins()}
        </GoogleMapReact>
      </div>
      );
    }
    else 
    {
      //REPLACE <div/> WITH LOADING SCREEN
        return(<div/>);
    }
  }
}

export default MapPage;
