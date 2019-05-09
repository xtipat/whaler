import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import MapPage from '../MapPage.js'
import BinMarker from './BinMarker.js';
import GoogleMapReact from 'google-map-react';
import '../assets/scss/binDetails.scss';
import '../assets/scss/_base.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BinDetails extends React.Component {

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
        binType: bin.type,
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
          >
            <BinMarker
              lat={this.state.binLat}
              lng={this.state.binLng}
              isMini={true}
            />
          </GoogleMapReact>
        </div>
        <div style={{textAlign: 'right'}}>
          <Button variant="yellow"><FontAwesomeIcon icon='check-circle'/> Accept</Button>
          <Button variant="black"><FontAwesomeIcon icon='times-circle'/> Reject</Button>
        </div>
      </div>
    );
  }

  detailsContents(){
    return(
      <div>
        <img src="http://placekitten.com/270/200" />
        <p>Bin Type</p>
        <nav class="mb-0 navbar navbar-light bg-dark">
          <span class="navbar-brand mb-0 h1">{this.state.binType}</span>
        </nav>
        <div style={{textAlign: 'right'}}>
          <Button variant="yellow"><FontAwesomeIcon icon='check-circle'/> Accept</Button>
          <Button variant="black"><FontAwesomeIcon icon='times-circle'/> Reject</Button>
        </div>
      </div>
    );
  }

  resultsContents(){
    console.log(this.state.binLocAcpt);
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
      return(<div/>);
    }
  }
}


export default BinDetails;
