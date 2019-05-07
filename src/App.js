import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menubar from './Menubar.js';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './assets/scss/_base.scss';

function App() {
  return (
    <Container fluid>
      <Row className="justify-content-sm-center outer-wrap">
        <Col xs={12} sm={8} md={6} lg={4} className="page-wrap">
          <Menubar />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
