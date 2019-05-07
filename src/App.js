import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js"
import './assets/scss/_base.scss';
import MapPage from './MapPage';

function App() {
  return (
    <Container fluid>
      <Row className="justify-content-sm-center outer-wrap">
        <Col xs={12} sm={8} md={6} lg={4} className="page-wrap">
          test
          <MapPage></MapPage>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
