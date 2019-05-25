import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer, toast } from 'react-toastify';
import Menubar from './Menubar.js';
import Profile from './Profile.js';
import Explore from './Explore.js';
import Redeem from './Redeem.js';
import Details from './components/Details';
import ModalRedeem from './components/ModalRedeem';
import Signin from './authentication/Signin.js';
import Signout from './authentication/Signout.js';
import Signup from './authentication/Signup.js';
import Loader from './components/Loader.js'
import Unmatched from './components/404.js'
import withAuthentication from './session/withAuthentication.js';
import AuthUserContext from './session/authUserContext';
//import GoogleMapReact from 'google-map-react';
import MapPage from './MapPage.js'
import Locate from './components/Locate.js';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './assets/scss/_base.scss';
import 'react-toastify/dist/ReactToastify.css';
import {
  faTrash, faTimesCircle, faCheckCircle, faMapMarkedAlt, faSearch, faGift,
  faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes, faCircleNotch,
  faMale, faMapMarkerAlt, faInfoCircle, faPollH, faFish, faHeartBroken, faHome
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faTimesCircle, faCheckCircle, faMapMarkedAlt, faSearch,
  faGift, faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes, faCircleNotch,
  faMale, faMapMarkerAlt, faInfoCircle, faPollH, faFish, faHeartBroken, faHome);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1000)
  }

  render(){
    return (
      <Container fluid>
        <Row className='justify-content-sm-center outer-wrap'>
            <AuthUserContext.Consumer>
            {authUser => {

              if(authUser){
                //console.log(authUser)
                return(
                  <Col xs={12} sm={8} md={6} lg={4} className='page-wrap'>
                    <Page />
                    <ModalRedeem/>
                    <ToastContainer position={toast.POSITION.TOP_CENTER} />
                    <Menubar />
                  </Col>
                );
              } else {
                if(this.state.loading){
                  return(
                  <Col xs={12} sm={8} md={6} lg={4} className='nonauth-wrap'>
                    <Loader primary />
                  </Col>
                  )
                }
                else {
                  return(
                  <Col xs={12} sm={8} md={6} lg={4} className='nonauth-wrap'>
                    <NonAuth />
                    <ToastContainer position={toast.POSITION.TOP_CENTER} />
                  </Col>
                );
                }
              }
            }
            }
            </AuthUserContext.Consumer>
        </Row>
      </Container>
    );
  }
}

const Page = () => (
  <Switch>
      <Route exact path='/' component={MapPage} />
      <Route path='/redeem' component={Redeem} />
      <Route path='/explore' component={Explore} />
      <Route path='/profile' component={Profile} />
      <Route path='/locate' component={Locate} />
      <Route path='/details' component={Details}/>
      <Route path='/logout' render={() => (<Signout auth/>)}/>
      <Route path='/login' render={() => (<Redirect to='/' />)}/>
      <Route path='/signup' render={() => (<Redirect to='/' />)}/>
      <Route component={Unmatched} />
  </Switch>
)

const NonAuth = () => (
  <Switch>
    <Route path='/login' component={Signin} />
    <Route path='/signup' component={Signup} />
    <Route path='/logout' component={Signout}/>
    <Route render={() => (
          <Redirect to='/login' />
    )}/>
  </Switch>
)
export default withRouter(withAuthentication(App));

