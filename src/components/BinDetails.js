import React, { Component } from 'react';
import { db, storage, firebaseConfig } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import MapPage from '../MapPage.js';
import BinMarker from './BinMarker.js';
import GoogleMapReact from 'google-map-react';
import Loader from './Loader.js';
import '../assets/scss/modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import firebase from "firebase/app";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "@react-firebase/database";

export default class BinDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      picLoaded: false,
      loaded: false,
      show: false
    };
  };

  fetchBinData(){
    db.ref(`bins/${this.props.fbkey}`).once('value').then(snapshot => {
      let bin = snapshot.val();
      this.setState({
        binLat: bin.location.lat,
        binLng: bin.location.lng,
        binTypes: bin.types,
        binLocAcpt: bin.locationAccept,
        binLocRjct: bin.locationReject,
        binDetAcpt: bin.detailAccept,
        binDetRjct: bin.detailReject,
        loaded: true
      });
      this.calculatePercent();
    }
    );
    var strRef = storage.ref();
    strRef.child(`${this.props.fbkey}`).getDownloadURL().then((url) => {
      this.setState({
        binPicSrc: url,
        picLoaded: true
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  calculatePercent(){
    this.setState({
      binLocAcptPer: Math.round(100*this.state.binLocAcpt/50),
      binDetAcptPer: Math.round(100*this.state.binDetAcpt/50),
      binLocRjctPer: Math.round(100*this.state.binLocRjct/50),
      binDetRjctPer: Math.round(100*this.state.binDetRjct/50)
    });
  }

  componentDidUpdate(prevProps) {
    //console.log(this.state.show,prevProps.show);
    if(this.props.show !== prevProps.show)
      this.fetchBinData();
  }

  locationContents() {
    return(
      <div>
        <div style={{ height: '50vh', width: '100%'}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
            defaultCenter={{lat: this.state.binLat,lng: this.state.binLng}}
            defaultZoom={17}
            options={{
              fullscreenControl: false,
              zoomControl: false
            }}
          >
            <BinMarker
              lat={this.state.binLat}
              lng={this.state.binLng}
              isMini={true}
              icon={this.props.icon}
            />
          </GoogleMapReact>
        </div>
        <div style={{textAlign: 'right'}}>
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/locationAccept`}>
              {({ runTransaction }) => {
                return (
                  <Button ref="locAcptBtn" variant="yellow" onClick={() => {
                    runTransaction({reducer: val => {return val + 1;}})
                    .then(() => {
                          toast.success("Location of this bin was accepted.");
                        });
                  }}>
                    <FontAwesomeIcon icon='check-circle'/> Accept
                  </Button>
                );
              }}
            </FirebaseDatabaseTransaction>
            <div class="divider"></div>
            <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/locationReject`}>
              {({ runTransaction }) => {
                return (
                  <Button variant="black" onClick={() => {
                    runTransaction({reducer: val => {return val + 1;}})
                    .then(() => {
                          toast.warning("Location of this bin was rejected.");
                        });
                  }}>
                    <FontAwesomeIcon icon='times-circle'/> Reject
                  </Button>
                );
              }}
            </FirebaseDatabaseTransaction>
            <div class="divider"></div>
          </FirebaseDatabaseProvider>
        </div>
      </div>
    );
  }
  writeAllBinTypes(){
    if(this.state.loaded == true){
      let types = [];
      for(let i = 0;i<this.state.binTypes.length;i++)
      {
        types.push(
          <div class="alert alert-warning">{this.state.binTypes[i]}</div>
        );
      }
      return types
    }
  }
  checkPicture(){
    if(this.state.picLoaded == false)
      return <img className="picframe" src="http://placekitten.com/270/200"/>
    else
      return <img className="picframe" src={this.state.binPicSrc}/ >
  }
  detailsContents(){
    return(
      <div>
        {this.checkPicture()}
        <div class="bintypes-container">
          <span class='types-head'>Bin Type</span>
          {this.writeAllBinTypes()}
        </div>
        <div style={{textAlign: 'right'}}>
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
          <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/detailAccept`}>
            {({ runTransaction }) => {
              return (
                <Button variant="yellow" onClick={() => {
                  runTransaction({reducer: val => {return val + 1;}})
                  .then(() => {
                        toast.success("Details of this bin were accepted.");
                      });
                }}>
                  <FontAwesomeIcon icon='check-circle'/> Accept
                </Button>
              );
            }}
          </FirebaseDatabaseTransaction>
          <div class="divider"></div>
          <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/detailReject`}>
            {({ runTransaction }) => {
              return (
                <Button variant="black" onClick={() => {
                  runTransaction({reducer: val => {return val + 1;}})
                  .then(() => {
                        toast.warning("Details of this bin were rejected.");
                      });
                }}>
                  <FontAwesomeIcon icon='times-circle'/> Reject
                </Button>
              );
            }}
          </FirebaseDatabaseTransaction>
          <div class="divider"></div>
        </FirebaseDatabaseProvider>
        </div>
      </div>
    );
  }

  resultsContents(){
    return(
      <div>
        <span>Location</span>
        <ProgressBar striped variant="success" now={this.state.binLocAcptPer} />
        <br></br>
        <ProgressBar striped variant="danger" now={this.state.binLocRjctPer} />
        <br></br>
        <span>Detail</span>
        <ProgressBar striped variant="success" now={this.state.binDetAcptPer} />
        <br></br>
        <ProgressBar striped variant="danger" now={this.state.binDetRjctPer} />
      </div>
    );
  }

  render() {
    if(this.state.loaded){
      return (
        <Modal
          size="sm"
          {...this.props}
          centered
        >
          <Tab.Container defaultActiveKey="location">
            <Modal.Header closeButton>
              <Nav fill variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="location">Location</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="details">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="results">Results</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="location">
                  {this.locationContents()}
                </Tab.Pane>
                <Tab.Pane eventKey="details">
                  {this.detailsContents()}
                </Tab.Pane>
                <Tab.Pane eventKey="results">
                  {this.resultsContents()}
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      );
    }
    else{
      //TO BE REPLACED WITH LOADING SCREEN
      if (this.props.show){
        return(
          <Modal size="sm" {...this.props} centered>
            <Loader primary />
          </Modal>
        )
      }
      else
        return(null)
    }
  }
}
