import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt, faSearch, faGift, faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { zoomIn } from 'react-animations';
import styled, {keyframes} from 'styled-components';
import './assets/scss/menubar.scss';
import MenuHere from './components/MenuHere.js'
import MenuLocate from './components/MenuLocate.js'

library.add(faMapMarkedAlt, faSearch, faGift, faUserCircle, faPlusCircle, faMapPin, faCompass, faTimes)

const styles = {
  exMenuL: {
    transform: 'translate(-180%, 0)'
  },

  exMenuM: {
    transform: 'translate(-45%, -80%)'
  },

  exMenuR: {
    transform: 'translate(90%, 0)'
  },
};

const Zoom = styled.div `animation: 0.3s ${keyframes `${zoomIn}`}`;
class Menubar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plusButtonClass: 'plus-icon',
    }

    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handlePlusClick(){
    if(this.state.plusButtonClass == 'plus-icon'){
      this.setState({ plusButtonClass: 'plus-icon-active' })
    }

    else {
      this.setState({ plusButtonClass: 'plus-icon' })
    }
  }

  handleClose(){
    this.setState({ plusButtonClass: 'plus-icon'})
  }

  render(){
    return(
      <div>
        <div className='menu-wrap'>
          <Row className='justify-content-center'>
            <Col className='icon-wrap'>
              <NavLink exact to='/' className='icon-default' activeClassName='icon-active'>
                <FontAwesomeIcon
                  icon='map-marked-alt'
                  size="2x"
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
            <Col className='icon-wrap'>
              <NavLink to='/explore' className='icon-default'activeClassName='icon-active'>
                <FontAwesomeIcon
                  icon='search'
                  size="2x"
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
            <Col xs={2}>
            </Col>
            <Col className='icon-wrap'>
              <NavLink to='/redeem' className='icon-default' activeClassName='icon-active'>
                <FontAwesomeIcon
                  icon='gift'
                  size="2x"
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
            <Col className='icon-wrap'>
              <NavLink to='/profile' className='icon-default' activeClassName='icon-active'>
                <FontAwesomeIcon
                  icon='user-circle'
                  size='2x'
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
          </Row>
        </div>
        <div>
          <Row className='justify-content-center'>
            <Col xs={3} className='circle-wrap'>
              <button className='plus-button-wrap' onClick={this.handlePlusClick}>
                <FontAwesomeIcon
                  icon='plus-circle'
                  className= {this.state.plusButtonClass}
                  size='5x'/>
              </button>
              {
                this.state.plusButtonClass == 'plus-icon' ? <div />:
                  <Row className='justify-content-center'>
                    <Zoom>
                      <MenuHere/>
                      <MenuLocate/>
                      <div className='extended-menu-wrap'
                        onClick={ this.handleClose }
                        style={ styles.exMenuR }>
                        <FontAwesomeIcon
                          icon='times'
                          className='cancel-icon'
                          size='2x'
                          />
                        <div className='cancel-label'>cancel</div>
                      </div>
                    </Zoom>
                  </Row>
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Menubar;
