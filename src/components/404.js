import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';
import '../assets/scss/auth.scss';

class Unmatched extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount(){
    if(!this.state.auth){
      setTimeout(() => {
        this.setState({ redirect: true})
      }, 5000);
    }
  }

  render(){
    if(this.state.redirect){
      return (<Redirect to='/' />)
    }
    else {
      return(
        <div className='unauth-wrapper'>
          <Row className='justify-content-center' style={{ height: '100%' }}>
            <Col xs={8}>
              <div className='form-outer-wrap'>
                <div className='form-title'>
                  Oops! <FontAwesomeIcon icon='heart-broken' />
                </div>
                <div className='float-text'>
                  <div>seems like the page you're looking for <span className='float-text-primary'>does not exist</span></div>
                  <div>wait a while and we'll redirect you back to the homepage, or</div>
                </div>
                <div style={{ textAlign: 'center'}}>
                  <Link to='/'>
                    <Button variant='yellow'>Go Back Now</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Unmatched;
