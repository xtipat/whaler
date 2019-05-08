import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import '../assets/scss/binDetails.scss';
import '../assets/scss/_base.scss';

class BinDetails extends React.Component {
  render() {
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
                Loca
              </Tab.Pane>
              <Tab.Pane eventKey="details">
              </Tab.Pane>
              <Tab.Pane eventKey="results">
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    );
  }
}


export default BinDetails;
