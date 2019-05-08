import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import '../assets/scss/binDetails.scss';

class BinDetails extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Nav variant="pills" defaultActiveKey="location">
            <Nav.Item bsClass="tabs">
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

        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default BinDetails;
