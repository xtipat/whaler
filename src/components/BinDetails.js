import React, { Component } from 'react';
import { db, storage } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import MapPage from '../MapPage.js';
import BinMarker from './BinMarker.js';
import GoogleMapReact from 'google-map-react';
import Loader from './Loader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/scss/modal.scss';


const styles = {
  modalContentWrap: {
    background: 'white',
    width: '100%',
    padding: '20px',
  },

  colors: {
    primary: '#FEC93F'
  }
}

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
        binKey: this.props.fbkey,
        binLat: bin.location.lat,
        binLng: bin.location.lng,
        binTypes: bin.types,
        binLocAcpt: bin.locationAccept,
        binLocRjct: bin.locationReject,
        binDetAcpt: bin.detailAccept,
        binDetRjct: bin.detailReject,
        loaded: true
      }, ()=>this.calculatePercent());
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

  updateLocAcpt(){
    db.ref(`bins/${this.state.binKey}/locationAccept`).transaction(locationAccept => locationAccept++);
  }

  updateLocRjct(){
    db.ref(`bins/${this.state.binKey}/locationReject`).transaction(locationReject => locationReject++);
  }

  updateDetAcpt(){
    db.ref(`bins/${this.state.binKey}/detailAccept`).transaction(detailAccept => detailAccept++);
  }

  updateDetRjct(){
    db.ref(`bins/${this.state.binKey}/detailReject`).transaction(detailReject => detailReject++);
  }

  calculatePercent(){
    if(this.state.binLocAcpt === undefined)
      this.setState({ binLocAcpt: 0})
    if(this.state.binLocRjct === undefined)
      this.setState({ binLocRjct: 0})
    if(this.state.binDetAcpt === undefined)
      this.setState({ binDetAcpt: 0})
    if(this.state.binDetRjctAcpt === undefined)
      this.setState({ binDetRjct: 0})

    this.setState({
      binLocAcptPer: Math.round(100*this.state.binLocAcpt/(this.state.binLocAcpt+this.state.binLocRjct)),
      binDetAcptPer: Math.round(100*this.state.binDetAcpt/(this.state.binDetAcpt + this.state.binDetRjct)),
      binLocRjctPer: Math.round(100*this.state.binLocRjct/100),
      binDetRjctPer: Math.round(100*this.state.binDetRjct/100)
    });

    if(this.state.binLocAcpt + this.state.binLocRjct === 0)
      this.setState({
        binLocAcptPer: 0,
        binLocRjctPer: 0
      })

    if(this.state.binDetAcpt + this.state.binDetRjct === 0)
      this.setState({
        binDetAcptPer: 0,
        binDetRjctPer: 0
      })

    console.log(this.state.binLocAcptPer)
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
        <div style={{textAlign: 'center'}}>
          <Button variant="yellow" onClick={this.updateLocAcpt.bind(this)}><FontAwesomeIcon icon='check-circle'/> Accept</Button>
          <div className="divider"></div>
          <Button variant="black" onClick={this.updateLocRjct.bind(this)}><FontAwesomeIcon icon='times-circle'/> Reject</Button>
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
          <div className="tag-container">{this.state.binTypes[i]}</div>
        );
      }
      return types
    }
  }

  checkPicture(){
    if(this.state.picLoaded == false)
      return (
        <div style={{ textAlign: 'center'}}>
          <img src="http://placekitten.com/270/200"/>
        </div>
      )
    else
      return (
        <div style={{ textAlign: 'center'}}>
          <img src={this.state.binPicSrc} width='100%' height='100%'/>
        </div>
      )
  }

  detailsContents(){
    return(
      <div>
        {this.checkPicture()}
        <div className='modal-content-title'>Bin Type</div>
        <div className='tag-wrap'>
          {this.writeAllBinTypes()}
        </div>
        <div style={{textAlign: 'center'}}>
          <Button variant="yellow" onClick={this.updateDetAcpt.bind(this)}><FontAwesomeIcon icon='check-circle'/> Accept</Button>
          <div className="divider"></div>
          <Button variant="black" onClick={this.updateDetRjct.bind(this)}><FontAwesomeIcon icon='times-circle'/> Reject</Button>
        </div>
      </div>
    );
  }

  resultsContents(){
    return(
      <div>
        <div className='modal-content-title'>Location Reliability</div>
        <ProgressBar striped variant="success" now={this.state.binLocAcptPer} />

        <div className='modal-content-title'>Info Reliability</div>
        <ProgressBar striped variant="success" now={this.state.binDetAcptPer} />
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
            <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
              <div style={{ textAlign: 'right', width: '100%'}}>
                <div className='custom-close-wrap' onClick={ this.props.onHide }>
                  <div className='custom-close-label'>close</div>
                  <FontAwesomeIcon icon='times-circle' className='custom-close-icon'/>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body style={{ padding: 0, background: styles.colors.primary }}>
              <Nav fill variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="location">
                    <FontAwesomeIcon icon='map-marked-alt' className='nav-icon' />
                    <div className='nav-label'>location</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="details">
                    <FontAwesomeIcon icon='info-circle' className='nav-icon' />
                    <div className='nav-label'>info</div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="results">
                    <FontAwesomeIcon icon='poll-h' className='nav-icon' />
                    <div className='nav-label'>statistics</div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="location" style={ styles.modalContentWrap }>
                  {this.locationContents()}
                </Tab.Pane>
                <Tab.Pane eventKey="details" style={ styles.modalContentWrap }>
                  {this.detailsContents()}
                </Tab.Pane>
                <Tab.Pane eventKey="results" style={ styles.modalContentWrap }>
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
