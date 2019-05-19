import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import '../assets/scss/auth.scss';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleSignOut () {
    auth
      .doSignOut()
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(error => {
        console.log(error)
      });
  }

  render(){
    return(
      <div className='unauth-wrapper'>
        <Row className='justify-content-center' style={{ height: '100%' }}>
          <Col xs={8}>
            <div className='form-outer-wrap'>
              <div className='form-title'>
                dropping out ?
              </div>
              <div style={{ textAlign: 'center'}}>
                <Button variant='yellow' onClick={this.handleSignOut}>Logout</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Signout;
