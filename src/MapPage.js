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
    zoom: 11,
    exampleMapStyles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
  };

  constructor(props){
    super(props);
    this.state = {
        loading: null,
        markers: []
    };
  };

  fetchAllBinsData(){
    this.setState({
      loaded: false,
      loading: true
    });
    db.ref(`bins`).once('value').then(snapshot => {
      snapshot.forEach((child) => {
        var a = child.val().location;
        a.key = child.key;
        this.setState({
          markers: this.state.markers.concat(a)
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
    this.fetchAllBinsData();
  }

  markAllBins(){
    let markers = [];
    for(let i = 0;i<this.state.markers.length;i++)
    {
      markers.push(
        <BinMarker
        lat={this.state.markers[i].lat}
        lng={this.state.markers[i].lng}
        fbkey={this.state.markers[i].key}/>
      );
    }
    return markers
  }

  render() {
    if(this.state.loaded)
    {
      return (
      <div style={{ height: '91vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{styles :this.props.exampleMapStyles}}
        >
        {this.markAllBins()}
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
