import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import '../assets/scss/auth.scss';

class Signout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      redirect: false,
    };
  }

  componentWillRecieveProps(){
    if (this.prevProps.auth !== this.props.auth)
      this.setState({ auth: this.props.auth, redirect: false})
  }

  componentDidMount(){
    if(!this.state.auth){
      setTimeout(() => {
        this.setState({ redirect: true})
      }, 3000);
    }
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
    if(this.state.auth){
      return(
        <div className='unauth-wrapper'>
          <Row className='justify-content-center' style={{ height: '100%' }}>
            <Col xs={8}>
              <div className='form-outer-wrap'>
                <div className='form-title'>
                  dropping out ?
                </div>
                <div style={{ textAlign: 'center'}}>
                  <Link to='/profile'>
                    <Button variant='white'>Back</Button>
                  </Link>
                  <div className='divider' />
                  <Button variant='yellow' onClick={this.handleSignOut}>Logout</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    }

    else {
      if(this.state.redirect){
        return (<Redirect to='/login' />)
      }
      else {
        return(
          <div className='unauth-wrapper'>
            <Row className='justify-content-center' style={{ height: '100%' }}>
              <Col xs={8}>
                <div className='form-outer-wrap'>
                  <div className='form-title'>
                    You've logged out
                  </div>
                  <div className='float-text'>
                    wait a while and we'll redirect you to the first page, or
                  </div>
                  <div style={{ textAlign: 'center'}}>
                    <Link to='/login'>
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
}

export default Signout;
