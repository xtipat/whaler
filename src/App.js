import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js"
import './assets/scss/_base.scss';
import GoogleMapReact from 'google-map-react';


class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCv7aQ0qD19jSxd954UZSZVQSDXZr1cNLs'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

function App() {
  return (
    <Container fluid>
      <Row className="justify-content-sm-center outer-wrap">
        <Col xs={12} sm={8} md={6} lg={4} className="page-wrap">
        <Map></Map>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
