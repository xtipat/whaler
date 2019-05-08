import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import Menubar from './Menubar.js';
import Profile from './Profile.js'
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './assets/scss/_base.scss';

function App() {
  return (
    <Container fluid>
      <Row className='justify-content-sm-center outer-wrap'>
        <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
          <Page />
          <Menubar />
        </Col>
      </Row>
    </Container>
  );
}

const Page = () => (
  <Switch>
      <Route exact path='/' component={Profile} />
      <Route path='/redeem' component={Profile} />
      <Route path='/profile' component={Profile} />
  </Switch>
)

export default withRouter(App);
