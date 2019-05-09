import React, { Component } from 'react';
import {db} from '../firebase/firebase.js';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import '../assets/scss/binDetails.scss';
import '../assets/scss/_base.scss';

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
                  {this.state.binLat}
                </Tab.Pane>
                <Tab.Pane eventKey="details">
                  Det
                </Tab.Pane>
                <Tab.Pane eventKey="results">
                  Res
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
