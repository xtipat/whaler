import React, { Component } from 'react';
import { db } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import MapPage from '../MapPage.js';
import BinMarker from './BinMarker.js';
import GoogleMapReact from 'google-map-react';
import Loader from './Loader.js';
import '../assets/scss/modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class BinDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        loaded: false,
        show: false
    };
  };

  fetchBinData(){
    //console.log('YO');
    db.ref(`bins/${this.props.fbkey}`).once('value').then(snapshot => {
      let bin = snapshot.val();
      this.setState({
        binLat: bin.location.lat,
        binLng: bin.location.lng,
        binTypes: bin.types,
        binLocAcpt: bin.locationAccept,
        binDetAcpt: bin.detailAccept,
        loaded: true
      });
    }
    );
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
          <Button variant="yellow"><FontAwesomeIcon icon='check-circle'/> Accept</Button>
          <div class="divider"></div>
          <Button variant="black"><FontAwesomeIcon icon='times-circle'/> Reject</Button>
        </div>
      </div>
    );
  }
  writeAllBinTypes(){
    if(this.state.loaded == true){
      console.log(this.state.binLat)
      let types = [];
      for(let i = 0;i<this.state.binTypes.length;i++)
      {
        types.push(
          <div class="alert alert-info">{this.state.binTypes[i]}</div>
        );
      }
      return types
    }
  }
  detailsContents(){
    return(
      <div>
        <img src="http://placekitten.com/270/200" />
        <p>Bin Type</p>
        <nav class="mb-0 navbar navbar-light bg-dark">
          {this.writeAllBinTypes()}
        </nav>
        <div style={{textAlign: 'right'}}>
          <Button variant="yellow"><FontAwesomeIcon icon='check-circle'/> Accept</Button>
          <div class="divider"></div>
          <Button variant="black"><FontAwesomeIcon icon='times-circle'/> Reject</Button>
        </div>
      </div>
    );
  }

  resultsContents(){
    return(
      <div>
        <span>Location</span>
        <ProgressBar>
          <ProgressBar striped variant="success" now={35} key={1} />
          <ProgressBar striped variant="danger" now={20} key={2} />
        </ProgressBar>
        <span>Detail</span>
        <ProgressBar>
          <ProgressBar striped variant="success" now={50} key={1} />
          <ProgressBar striped variant="danger" now={20} key={2} />
        </ProgressBar>
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
