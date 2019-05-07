import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMapMarkedAlt, faSearch, faGift, faUserCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import './assets/scss/menubar.scss';

library.add(faMapMarkedAlt, faSearch, faGift, faUserCircle, faPlusCircle)

class Menubar extends React.Component {
  render(){
    return(
      <div>
        <div className='menu-wrap'>
          <Row className='justify-content-sm-center'>
            <Col className='icon-wrap'>
              <FontAwesomeIcon
                icon='map-marked-alt'
                className='icon-active'
                size="2x"
                />
            </Col>
            <Col className='icon-wrap'>
              <FontAwesomeIcon
                icon='search'
                className='icon-default'
                size="2x"
                />
            </Col>
            <Col xs={2}>
            </Col>
            <Col className='icon-wrap'>
              <FontAwesomeIcon
                icon='gift'
                className='icon-default'
                size="2x"
                />
            </Col>
            <Col className='icon-wrap'>
              <FontAwesomeIcon
                icon='user-circle'
                className='icon-default'
                size='2x'
                />
            </Col>
          </Row>
        </div>
        <div>
          <Row className='justify-content-sm-center'>
            <Col xs={3} className='circle-wrap'>
              <FontAwesomeIcon
                icon='plus-circle'
                className='plus-icon'
                size='5x'/>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Menubar;
