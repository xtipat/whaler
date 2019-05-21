import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './assets/scss/profile.scss'

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'JohnDoe',
      point: 123456,
      email: 'example@mail.com',
      addedBinCount: '99',
      votedBinCount: '99'
    }
  }
  render(){
    const { username, point, email, addedBinCount, votedBinCount } = this.state;
    return(
      <div className='prof-outer-wrap'>
        <div className='prof-inner-wrap'>
          <div className='prof-title'>My Account</div>
          <div className='first-section-wrap'>
            <Row className='justify-content-center'>
              <div className='prof-icon-container'>
                <img src={process.env.PUBLIC_URL + '/img/whaler_logo.png'} className='prof-img'/>
              </div>
            </Row>
            <Row className='justify-content-center'>
              <div className='prof-name'>{username}</div>
            </Row>
            <Row className='justify-content-center'>
              <div className='prof-point'>{point.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} points</div>
            </Row>
            <Row>
              <Col>
                <div className='content-title'>Username</div>
                <div className='content-text'>@{username}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='content-title'>Email</div>
                <div className='content-text'>{email}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='content-title'>Region</div>
                <div className='content-text'>Daejeon, South Korea</div>
              </Col>
            </Row>
          </div>

          <div className='section-wrap'>
            <Row>
              <Col>
                <div className='section-header'>Statistics</div>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <div style={{ textAlign: 'middle'}}>
                  <FontAwesomeIcon icon='trash'  className='stats-icon'/>
                </div>
              </Col>
              <Col>
                <div className='content-title'>{addedBinCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</div>
                <div className='content-text'>Bins Added</div>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <div style={{ textAlign: 'middle'}}>
                  <FontAwesomeIcon icon='poll-h'  className='stats-icon'/>
                </div>
              </Col>
              <Col>
                <div className='content-title'>{votedBinCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</div>
                <div className='content-text'>Bins Approved/Rejected</div>
              </Col>
            </Row>
          </div>

          <div style={{ margin: '0 30px'}}>
            <Row>
              <Col>
                <Link to='/logout'>
                  <Button variant='black' style={{ fontSize: '1.2rem', width:'100%' }}>Logout</Button>
                </Link>
              </Col>
            </Row>
          </div>

        </div>
      </div>
    )
  }
}

export default Profile;
