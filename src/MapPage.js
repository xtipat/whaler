import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BinMarker from './components/BinMarker.js';
import Loader from './components/Loader.js'
import { db } from './firebase/firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurPosMarker from './components/CurPosMarker.js';
import SearchBox from './components/SearchBox.js'
import HomeButton from './components/HomeButton.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const markerStyle = {
  position: 'fixed',
  width: 40,
  height: 40,
  left: '60%',
  top: '80%',
  zIndex: 100,

  borderRadius: 1,
  backgroundColor: 'gray',
  textAlign: 'center',
  color: 'white',
  fontSize: 16,
  padding: 4
};


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
      console.log(this.state.userLat,this.state.userLng);
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
      if(this.state.markers[i].locationAccept>=50){
        markers.push(
          <BinMarker
            lat={this.state.markers[i].location.lat}
            lng={this.state.markers[i].location.lng}
            key={this.state.markers[i].key}
            fbkey={this.state.markers[i].key}
            clickable = {false}
            icon="trash"
          />
        );
      }
      else{
        markers.push(
          <BinMarker
            lat={this.state.markers[i].location.lat}
            lng={this.state.markers[i].location.lng}
            key={this.state.markers[i].key}
            fbkey={this.state.markers[i].key}
            clickable = {true}
            icon="trash"
          />
        );
      }
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
  moveCenterTo(lat,lng){
    console.log("MOVEE")
    this.setState({lat: lat,lng: lng});
  }
  searchBoxHandler = (place) => {
    console.log(place[0].geometry.location.lat(),place[0].geometry.location.lng());
    this.moveCenterTo(place[0].geometry.location.lat(),place[0].geometry.location.lng());
  }
  onClickHomeButton = () => {
    this.getGeoLocation()
  }
  render() {
    if(this.state.binsLoaded && this.state.userLocLoaded)
    {
      return (
      <div style={this.props.divSize}>
        <SearchBox style={{position: 'fixed', zIndex:'100'}} onPlacesChanged={this.searchBoxHandler}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={{lat:this.props.lat,lng:this.props.lng}}
          center={{lat:this.state.lat,lng:this.state.lng}}
          defaultZoom={this.props.zoom}
          onChange={({ center }) => this.props.handleCenter(center)}
          options={{
            //styles :this.props.exampleMapStyles,
            fullscreenControl: false,
            zoomControl: false
          }}
        >
        {this.markAllBins()}
        {this.markCurPos()}
        </GoogleMapReact>
        <FontAwesomeIcon style={markerStyle} icon="home" onClick={this.getGeoLocation}/>
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
