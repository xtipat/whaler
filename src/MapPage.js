import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BinMarker from './components/BinMarker.js';
import Loader from './components/Loader.js'
import { db } from './firebase/firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurPosMarker from './components/CurPosMarker.js';

class MapPage extends Component {
  static defaultProps = {
    isMini: false,
    divSize: { height: '100vh', width: '100%'},
    center: {
      lat: 59.95,
      lng: 30.33
    },
    handleCenter: () => {},
    zoom: 15,
    exampleMapStyles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
  };

  constructor(props){
    super(props);
    this.state = {
        loading: null,
        markers: [],
        lat: this.props.center.lat,
        lng: this.props.center.lng,
        locLoaded: false
    };
  };
  getGeoLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        locLoaded: true
      })
      },
      error => {
        this.setState({locLoaded: true});
        toast.error("Can't get your current position, try enable your GPS");
      }
      )
    }
    else{
      toast.error("We can't detect GPS on your device!");
      this.setState({locLoaded: true});
    }
  }

  fetchAllBinsData(){
    this.setState({
      binsLoaded: false,
      loading: true
    });
    if(!this.props.isMini)
      db.ref(`bins`).once('value').then(snapshot => {
        snapshot.forEach((child) => {
          var a = child.val().location;
          a.key = child.key;
          this.setState({
            markers: this.state.markers.concat(a)
          });
        });
        this.setState({loading: false,binsLoaded: true})
        }
      );
    else
    {
      this.setState({loading: false,binsLoaded: true});
    }
  }

  componentDidMount() {
    this.fetchAllBinsData();
    this.getGeoLocation();
  }

  markAllBins(){
    let markers = [];
    for(let i = 0;i<this.state.markers.length;i++)
    {
      markers.push(
        <BinMarker
          lat={this.state.markers[i].lat}
          lng={this.state.markers[i].lng}
          key={this.state.markers[i].key}
          fbkey={this.state.markers[i].key}
          clickable = {true}
          icon="trash"
        />
      );
    }
    return markers
  }
  markCurPos(){
    return(
      <CurPosMarker
        lat={this.state.lat}
        lng={this.state.lng}
      />
    );
  }
  render() {
    if(this.state.binsLoaded && this.state.locLoaded)
    {
      return (
      <div style={this.props.divSize}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={{lat:this.state.lat,lng:this.state.lng}}
          defaultZoom={this.props.zoom}
          onChange={({ center }) => this.props.handleCenter(center)}
          options={{
            styles :this.props.exampleMapStyles,
            fullscreenControl: false,
            zoomControl: false
          }}
        >
        {this.markAllBins()}
        {this.markCurPos()}
        </GoogleMapReact>
      </div>
      );
    }
    else
    {
      //REPLACE <div/> WITH LOADING SCREEN
        return(<Loader />);
    }
  }
}

export default MapPage;
