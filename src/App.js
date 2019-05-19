import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Menubar from './Menubar.js';
import Profile from './Profile.js'
import Redeem from './Redeem.js';
import Details from './components/Details';
import ModalRedeem from './components/ModalRedeem';
import Signin from './authentication/Signin.js';
import Signup from './authentication/Signup.js';
import Loader from './components/Loader.js'
import withAuthentication from './session/withAuthentication.js';
import AuthUserContext from './session/authUserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './assets/scss/_base.scss';
import 'react-toastify/dist/ReactToastify.css';
//import GoogleMapReact from 'google-map-react';
import MapPage from './MapPage.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import Locate from './components/Locate.js';
import {
  faTrash, faTimesCircle, faCheckCircle, faMapMarkedAlt, faSearch, faGift,
  faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes, faCircleNotch,
  faMale, faMapMarkerAlt, faInfoCircle, faPollH, faFish
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faTimesCircle, faCheckCircle, faMapMarkedAlt, faSearch,
  faGift, faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes, faCircleNotch,
  faMale, faMapMarkerAlt, faInfoCircle, faPollH, faFish);

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
    }, 400)
  }

  render(){
    return (
      <Container fluid>
        <Row className='justify-content-sm-center outer-wrap'>
            <AuthUserContext.Consumer>
            {authUser => {
              if(authUser){
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
      <Route path='/nearby' component={Profile} />
      <Route path='/profile' component={Profile} />
      <Route path='/locate' component={Locate} />
      <Route path='/details' component={Details}/>
      <Route exact path='/signin' render={() => (
						<Redirect to='/' />
			)}/>
      <Route exact path='/signup' render={() => (
						<Redirect to='/' />
			)}/>
  </Switch>
)

const NonAuth = () => (
  <Switch>
    <Route path='/signin' component={Signin} />
    <Route path='/signup' component={Signup} />
    <Route path render={() => (
          <Redirect to='/signin' />
    )}/>
  </Switch>
)
export default withRouter(withAuthentication(App));
