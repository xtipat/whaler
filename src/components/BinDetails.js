import React from 'react';
import { db, storage, firebaseConfig } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import BinMarker from './BinMarker.js';
import GoogleMapReact from 'google-map-react';
import Loader from './Loader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "@react-firebase/database";
import '../assets/scss/modal.scss';
import {DetAcpt, DetRjct, LocRjct, LocAcpt} from './ModalVoted.js'


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
      buttonLoaded: false,
      show: false,
      modalShow: false,
      detRjct: false,
      detAcpt: false,
      locRjct: false,
      locAcpt: false,
      tab: 'location'
    };
    this.detAcptBtn = React.createRef();
    this.detRjctBtn = React.createRef();
    this.locAcptBtn = React.createRef();
    this.locRjctBtn = React.createRef();
    this.disableDetVoteButtons.bind(this);
    this.disableLocVoteButtons.bind(this);
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

  checkUser(){
    db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).once('value').then(snapshot => {
      let value = snapshot.val();
      if (value === null){
        this.setState({
          hideLocBtn: false,
          hideDetBtn: false,
          buttonLoaded: true,
        });
      }
      else{
        this.setState({
          hideLocBtn: value.locaVoted,
          hideDetBtn: value.detVoted,
          buttonLoaded: true,
        });
      }
    }
    );
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
      binLocRjctPer: Math.round(100*this.state.binLocRjct/(this.state.binLocAcpt+this.state.binLocRjct)),
      binDetAcptPer: Math.round(100*this.state.binDetAcpt/(this.state.binDetAcpt+this.state.binDetRjct)),
      binDetRjctPer: Math.round(100*this.state.binDetRjct/(this.state.binDetAcpt+this.state.binDetRjct))
    });

  }

  addBinVote(){
    db.ref(`/users/${this.props.uid}`).once('value').then( snapshot => {
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
    if(this.props.show !== prevProps.show){
      this.fetchBinData();
      this.checkUser();
    }
  }

  writeAllBinTypes(){
    if(this.state.loaded){
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
    if(!this.state.picLoaded)
      return (
        <div style={{ textAlign: 'center', borderRadius: '10px'}}>
          <img src="http://placekitten.com/260/200" alt='mock-bin-pic'/>
        </div>
      )
    else
      return (
        <div style={{ textAlign: 'center', borderRadius: '10px'}}>
          <img src={this.state.binPicSrc} alt='bin-pic' width='100%' height='100%'/>
        </div>
      )
  }

  voteDet(){
    this.addBinVote();
    this.detRjctBtn.current.setAttribute("disabled", true);
    this.detAcptBtn.current.setAttribute("disabled", true);
    db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).update({'detVoted': true}).then(() => this.setState({voteClicked: true, hideDetBtn: true}));
  }

  voteLoc(){
    this.addBinVote();
    this.locRjctBtn.current.setAttribute("disabled", true);
    this.locAcptBtn.current.setAttribute("disabled", true);
    //this.setState({voteClicked: true});
    db.ref(`/users/${this.props.uid}/binReactedWith/${this.props.fbkey}`).update({'locaVoted': true}).then(() => this.setState({voteClicked: true, hideLocBtn: true}));
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
        <div disabled={this.state.hideLocBtn} style={{textAlign: "center"}}>
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseTransaction path={`bins/${this.props.fbkey}/locationAccept`}>
              {({ runTransaction }) => {
                return (
                  <Button ref={this.locAcptBtn} disabled={this.state.hideLocBtn} variant="yellow" onClick={() => {
                    runTransaction({reducer: val => {return val + 1;}})
                    .then(() => {
                          this.setState({ locAcpt: true });
                          this.voteLoc();
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
                  <Button ref={this.locRjctBtn} disabled={this.state.hideLocBtn} variant="black" onClick={() => {
                    runTransaction({reducer: val => {return val + 1;}})
                    .then(() => {
                          this.setState({ locRjct: true });
                          this.voteLoc();
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
                <Button ref={this.detAcptBtn} disabled={this.state.hideDetBtn} variant="yellow" onClick={() => {
                  runTransaction({reducer: val => {return val + 1;}})
                  .then(() => {
                        this.setState({ detAcpt: true });
                        this.voteDet();
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
                <Button ref={this.detRjctBtn} disabled={this.state.hideDetBtn} variant="black" onClick={() => {
                  runTransaction({reducer: val => {return val + 1;}})
                  .then(() => {
                        this.setState({ detRjct: true });
                        this.voteDet();
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
        <div style={{paddingBottom: 30}}>
          <div className="left-label">Reject: {this.state.binLocRjct}</div>
          <div className="right-label">Accept: {this.state.binLocAcpt}</div>
        </div>
        <div className='modal-content-title'>Info Reliability</div>
        <section>
          <ProgressBar variant="danger" className="left" now={this.state.binDetRjctPer} />
          <ProgressBar variant="success" className="right" now={this.state.binDetAcptPer} />
        </section>
        <div style={{paddingBottom: 30}}>
          <div className="left-label">Reject: {this.state.binDetRjct}</div>
          <div className="right-label">Accept: {this.state.binDetAcpt}</div>
        </div>
      </div>
    );
  }

  onClose(){
    this.props.onHide();
    this.setState({
      loaded: false
    });
  }

  disableDetVoteButtons(){
    this.detRjctBtn.current.setAttribute("disabled", true);
    this.detAcptBtn.current.setAttribute("disabled", true);
  }

  disableLocVoteButtons(){
    this.locRjctBtn.current.setAttribute("disabled", true);
    this.locAcptBtn.current.setAttribute("disabled", true);
  }

  render() {
    let detRjctClose = () => {this.setState({ detRjct: false, voteClicked: false});}
    let detAcptClose = () => {this.setState({ detRjct: false, voteClicked: false });}
    let locRjctClose = () => {this.setState({ locRjct: false, voteClicked: false });}
    let locAcptClose = () => {this.setState({ locAcpt: false, voteClicked: false });}
    let next = () => {this.setState({tab: 'details'});}
    let result = () => {this.setState({tab: 'results'});}
    if(this.state.voteClicked){
      return(
        <div>
          <DetRjct
            show={this.state.detRjct}
            onHide={detRjctClose}
            result={result}
          ></DetRjct>
          <DetAcpt
            show={this.state.detAcpt}
            onHide={detAcptClose}
            result={result}
          ></DetAcpt>
          <LocRjct
            show={this.state.locRjct}
            onHide={locRjctClose}
            next={next}
          ></LocRjct>
          <LocAcpt
            show={this.state.locAcpt}
            onHide={locAcptClose}
            next={next}
          ></LocAcpt>
        </div>
      );
    }
    else if(this.state.loaded && this.props.show && this.state.buttonLoaded){
      return (
          <Modal
            size="sm"
            {...this.props}
            centered
          >
            <Tab.Container defaultActiveKey={this.state.tab}>
              <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
                <div style={{ textAlign: 'right', width: '100%'}}>
                  <div ref={this.close} className='custom-close-wrap' onClick={ this.onClose.bind(this) }>
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
