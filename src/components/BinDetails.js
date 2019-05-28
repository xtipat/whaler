import React, { Component } from 'react';
import { db, storage, firebaseConfig } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import MapPage from '../MapPage.js';
import BinMarker from './BinMarker.js';
import GoogleMapReact from 'google-map-react';
import Loader from './Loader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import firebase from "firebase/app";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "@react-firebase/database";
import '../assets/scss/modal.scss';
import { threshold } from '../data.js'


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

  calculatePercent(){
    if(this.state.binLocAcpt === undefined)
      this.setState({ binLocAcpt: 0})
    if(this.state.binLocRjct === undefined)
      this.setState({ binLocRjct: 0})
    if(this.state.binDetAcpt === undefined)
      this.setState({ binDetAcpt: 0})
    if(this.state.binDetRjctAcpt === undefined)
      this.setState({ binDetRjct: 0})

    let binLocAcptNet = this.state.binLocAcpt - this.state.binLocRjct;
    if(binLocAcptNet >= 0)
     this.setState({binLocAcptPer: binLocAcptNet, binLocRjctPer: 0})
    else this.setState({binLocAcptPer: 0, binLocRjctPer: Math.abs(binLocAcptNet)})

    let binDetAcptNet = this.state.binDetAcpt - this.state.binDetRjct;
    if(binDetAcptNet >= 0)
     this.setState({binDetAcptPer: binDetAcptNet, binDetRjctPer: 0})
    else this.setState({binDetAcptPer: 0, binDetRjctPer: Math.abs(binDetAcptNet)})

  }
  addBinVote(){
    var userRef = db.ref(`/users/${this.props.uid}`).once('value').then( snapshot => {
      var value = snapshot.val();
      var binsVoted = value.votedBinCount;
      var points = value.point;
      db.ref(`/users/${this.props.uid}`).update({
        'votedBinCount': binsVoted+1,
        'point': points+20,
      });
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
              isClickable={false}
              icon={this.props.icon}
            />
          </GoogleMapReact>
        </div>
        <div style={{textAlign: "center"}}>
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/locationAccept`}>
              {({ runTransaction }) => {
                return (
                  <Button disabled={this.props.hideLocBtn} ref="locAcptBtn" variant="yellow" onClick={() => {
                    runTransaction({reducer: val => {return val + 1;}})
                    .then(() => {
                          toast.success(<div> Location of this bin was accepted.<br/>You earned 20 points! </div>);
                          this.addBinVote();
                          db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).update({'locaVoted': true});
                        });
                  }}>
                    <FontAwesomeIcon icon='check-circle'/> Accept
                  </Button>
                );
              }}
            </FirebaseDatabaseTransaction>
            <div className="divider"></div>
            <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/locationReject`}>
              {({ runTransaction }) => {
                return (
                  <Button disabled={this.props.hideLocBtn} variant="black" onClick={() => {
                    runTransaction({reducer: val => {return val + 1;}})
                    .then(() => {
                          toast.warning(<div> Location of this bin was rejected.<br/>You earned 20 points! </div>);
                          this.addBinVote();
                          db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).update({'locaVoted': true});
                        });
                  }}>
                    <FontAwesomeIcon icon='times-circle'/> Reject
                  </Button>
                );
              }}
            </FirebaseDatabaseTransaction>
            <div className="divider"></div>
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
          <div className="tag-container">{this.state.binTypes[i]}</div>
        );
      }
      return types
    }
  }

  checkPicture(){
    if(this.state.picLoaded == false)
      return (
        <div style={{ textAlign: 'center', borderRadius: '10px'}}>
          <img src="http://placekitten.com/260/200"/>
        </div>
      )
    else
      return (
        <div style={{ textAlign: 'center', borderRadius: '10px'}}>
          <img src={this.state.binPicSrc} width='100%' height='100%'/>
        </div>
      )
  }

  detailsContents(){
    return(
      <div>
        {this.checkPicture()}
        <div className="bintypes-container">
          <div className='modal-content-title'>Bin Type</div>
            <div className='tag-wrap'>
              {this.writeAllBinTypes()}
            </div>
        </div>
        <div style={{textAlign: "center"}}>
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
          <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/detailAccept`}>
            {({ runTransaction }) => {
              return (
                <Button disabled={this.props.hideDetBtn} variant="yellow" onClick={() => {
                  runTransaction({reducer: val => {return val + 1;}})
                  .then(() => {
                        toast.success("Details of this bin were accepted.");
                        this.addBinVote();
                        db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).update({'detVoted': true});
                      });
                }}>
                  <FontAwesomeIcon icon='check-circle'/> Accept
                </Button>
              );
            }}
          </FirebaseDatabaseTransaction>
          <div className="divider"></div>
          <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/detailReject`}>
            {({ runTransaction }) => {
              return (
                <Button disabled={this.props.hideDetBtn} variant="black" onClick={() => {
                  runTransaction({reducer: val => {return val + 1;}})
                  .then(() => {
                        toast.warning("Details of this bin were rejected.");
                        this.addBinVote();
                        db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).update({'detVoted': true});
                      });
                }}>
                  <FontAwesomeIcon icon='times-circle'/> Reject
                </Button>
              );
            }}
          </FirebaseDatabaseTransaction>
          <div className="divider"></div>
        </FirebaseDatabaseProvider>
        </div>
      </div>
    );
  }

  resultsContents(){
    return(
      <div>
        <div className='modal-content-title'>Location Reliability</div>
        <section>
          <ProgressBar variant="danger" className="left" now={this.state.binLocRjctPer} />
          <ProgressBar variant="success" className="right" now={this.state.binLocAcptPer} />
        </section>
        <div>
          <div className="left-label">Reject: {this.state.binLocRjct}</div>
          <div className="right-label">Accept: {this.state.binLocAcpt}</div>
        </div>
        <div className='modal-content-title'>Info Reliability</div>
        <section>
          <ProgressBar variant="danger" className="left" now={this.state.binDetRjctPer} />
          <ProgressBar variant="success" className="right" now={this.state.binDetAcptPer} />
        </section>
        <div>
          <div className="left-label">Reject: {this.state.binDetRjct}</div>
          <div className="right-label">Accept: {this.state.binDetAcpt}</div>
        </div>
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
        {console.log(this.props.hideLocBtn)}
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
