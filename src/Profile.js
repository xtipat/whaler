import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { firebase, db } from './firebase'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from './components/Loader.js';
import './assets/scss/profile.scss';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        username: 'JohnDoe',
        point: 123456,
        email: 'example@mail.com',
        addedBinCount: 99,
        votedBinCount: 99,
        history: []
      },
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchUserData()
  }

  fetchUserData(){
  this.setState({
    loading: true,
  });
  db.onceGetOneUser(firebase.auth.currentUser.uid).then(snapshot =>
  {
    var user = {
      uid: snapshot.val().uid,
      username: snapshot.val().username,
      email: snapshot.val().email,
      point: snapshot.val().point,
      addedBinCount: snapshot.val().addedBinCount,
      votedBinCount: snapshot.val().votedBinCount,
      history: []
    }

    db.getHistory().then(snapshot => {
      snapshot.forEach((logEntry) => {
        if(logEntry.val().uid === user.uid){
          user.history.push(logEntry.val())
        }
      })
      this.setState({user: user, loading: false })
    }).catch((err)=> {
      console.log("fetch history error",err);});
  }).catch((err)=> {
    console.log("fetch user error",err);});
}

  render(){
    const { username, point, email, addedBinCount, votedBinCount } = this.state.user;
    if(this.state.loading){
      return(<Loader />)
    }

    else {
      return(
        <div className='prof-outer-wrap'>
          <Row className='justify-content-center'>
            <Col xs={11}>
              <div className='prof-inner-wrap'>
                <div className='prof-title'>My Account</div>
                <div className='first-section-wrap'>
                  <Row className='justify-content-center'>
                    <div className='prof-icon-container'>
                      <img src={process.env.PUBLIC_URL + '/img/whaler_logo.png'} alt='prof-pic' className='prof-img'/>
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

                <div className='section-wrap'>
                  <Row>
                    <Col>
                      <div className='section-header'>Redeem History</div>
                    </Col>
                  </Row>
                  {
                    this.state.user.history.map((entry) =>
                        <Row>
                          <Col xs={2}>
                            <div style={{ textAlign: 'middle'}}>
                              <FontAwesomeIcon icon='credit-card'  className='stats-icon'/>
                            </div>
                          </Col>
                          <Col>
                            <div className='content-title' style={{ textTransform: 'capitalize' }}>{ entry.rewardName }</div>
                            <div className='content-text'>Activate Code: 1234-5678-9689</div>
                            <div className='content-unimportant'>-{entry.point_used}P</div>
                          </Col>
                        </Row>
                    )
                  }

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
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default Profile;
