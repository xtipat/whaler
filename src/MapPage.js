import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BinMarker from './components/BinMarker.js';
import LocateMarker from './components/LocateMarker.js';
import CurPosMarker from './components/CurPosMarker.js';
import Loader from './components/Loader.js'
import { db } from './firebase/firebase.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBox from './components/SearchBox.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './assets/scss/homeIcon.scss';
import './assets/scss/_base.scss';
import {threshold} from './data.js'
class MapPage extends Component {
  static defaultProps = {
    isMini: false,
    divSize: { height: '100vh', width: '100%', position: 'relative'},
    center: {
      lat: 59.95,
      lng: 30.33
    },
    handleCenterForAddBin: () => {},
    zoom: 15,
    isInLocatePage: false,
    exampleMapStyles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
  };

  constructor(props){
    super(props);
    this.state = {
        loading: null,
        markers: [],
        userLat: this.props.center.lat,
        userLng: this.props.center.lng,
        lat:this.props.center.lat,
        lng:this.props.center.lng,
        userLocLoaded: false
    };
  };
  getGeoLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      position => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude,
        userLocLoaded: true
      })
      this.moveCenterTo(this.state.userLat,this.state.userLng);
      },
      error => {
        this.setState({userLocLoaded: true});
        toast.error("Can't get your current position, try enable your GPS");
      }
      )
    }
    else{
      toast.error("We can't detect GPS on your device!");
      this.setState({userLocLoaded: true});
    }
  }

  fetchAllBinsData(){
    this.setState({
      binsLoaded: false,
      loading: true
    });
    if(!this.props.isMini)
    {
      db.ref(`bins`).on('value', (snapshot) => {
        this.setState({markers: []});
        let val = snapshot.val();
        Object.keys(val).forEach( (item) => {
          var a = val[item];
          a.key = item;
          this.setState({markers: [...this.state.markers, a]});
        })
      });
      this.setState({loading: false,binsLoaded: true})
    }
    else
    {
      this.setState({loading: false,binsLoaded: true});
    }
  }

  componentDidMount() {
    this.fetchAllBinsData();
    this.getGeoLocation();
  }
  componentWillUnmount() {
    db.ref(`bins`).off();
  }
  markAllBins(){
    let markers = [];
    //console.log(this.state.markers)
    for(let i = 0;i<this.state.markers.length;i++){
        markers.push(
          <BinMarker
            lat={this.state.markers[i].location.lat}
            lng={this.state.markers[i].location.lng}
            key={this.state.markers[i].key}
            fbkey={this.state.markers[i].key}
            isAccepted = {(this.state.markers[i].locationAccept>=threshold)&&
              (this.state.markers[i].detailAccept>=threshold)}
            uid={this.props.uid}
            icon="trash"
            isClickable={!this.props.isInLocatePage}
          />
        );
    }
    return markers
  }
  markCurPos(){
    return(
      <CurPosMarker
        lat={this.state.userLat}
        lng={this.state.userLng}
      />
    );
  }
  markLocatePin(){
    if(this.props.isInLocatePage){
      return(
        <LocateMarker
          lat = {this.state.nowLat}
          lng = {this.state.nowLng}
          handleLocationPinButton = {this.props.handleLocationPinButton}
        />
      );
    }
  }
  moveCenterTo(lat,lng){
    this.setState({lat: this.state.nowLat,lng: this.state.nowLng});
    this.setState({lat: lat,lng: lng});
  }
  searchBoxHandler = (place) => {
    // console.log(place[0].geometry.location.lat(),place[0].geometry.location.lng());
    if(place[0])
      this.moveCenterTo(place[0].geometry.location.lat(),place[0].geometry.location.lng());
  }
  onClickHomeButton = () => {
    this.getGeoLocation()
  }
  handleCenterChange =(center) => {
    this.props.handleCenterForAddBin(center);
    this.setState({
      nowLat: center.lat,
      nowLng: center.lng
    });
  }
  render() {
    if(this.state.binsLoaded && this.state.userLocLoaded)
    {
      return (
      <div style={this.props.divSize}>
        <SearchBox onPlacesChanged={this.searchBoxHandler}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={{lat:this.props.lat,lng:this.props.lng}}
          center={{lat:this.state.lat,lng:this.state.lng}}
          defaultZoom={this.props.zoom}
          onChange={({ center }) => this.handleCenterChange(center)}
          options={{
            //styles :this.props.exampleMapStyles,
            fullscreenControl: false,
            zoomControl: false
          }}
        >
        {this.markAllBins()}
        {this.markCurPos()}
        {this.markLocatePin()}
        </GoogleMapReact>
        <div className='home-icon-container'  onClick={this.onClickHomeButton}>
          <FontAwesomeIcon  icon="location-arrow" className="home-icon" activeClassName='icon-active'/>
        </div>
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
