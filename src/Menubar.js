import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zoomIn } from 'react-animations';
import styled, {keyframes} from 'styled-components';
import './assets/scss/menubar.scss';
import MenuHere from './components/MenuHere.js'
import MenuLocate from './components/MenuLocate.js'

const styles = {
  exMenuR: {
    transform: 'translate(160%, 0)'
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
    if(this.state.plusButtonClass === 'plus-icon'){
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
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
            <Col className='icon-wrap'>
              <NavLink to='/explore' className='icon-default'activeClassName='icon-active'>
                <FontAwesomeIcon
                  icon='search'
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
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
            <Col className='icon-wrap'>
              <NavLink to='/profile' className='icon-default' activeClassName='icon-active'>
                <FontAwesomeIcon
                  icon='user-circle'
                  onClick={ this.handleClose }
                  />
              </NavLink>
            </Col>
          </Row>
        </div>
        <div>
          <Row className='justify-content-center'>
            <Col xs={4} className='circle-wrap'>
              <div className='plus-button-wrap' onClick={this.handlePlusClick}>
                <FontAwesomeIcon
                  icon='plus-circle'
                  className= {this.state.plusButtonClass}
<<<<<<< HEAD
                  size='5x'/>
              </div>
=======
                  />
              </button>
>>>>>>> 4f6494a3a02c91c8f532772d4099aede7d360dd3
              {
                this.state.plusButtonClass === 'plus-icon' ? <div />:
                  <Row className='justify-content-center'>
                    <Col>
                      <Zoom>
                        <MenuHere onClick={ this.handleClose } />
                        <MenuLocate onClick={ this.handleClose } />
                        <div className='extended-menu-wrap'
                          onClick={ this.handleClose }
                          style={ styles.exMenuR }>
                          <FontAwesomeIcon
                            icon='times'
                            className='cancel-icon'
                            />
                          <div className='cancel-label'>cancel</div>
                        </div>
                      </Zoom>
                    </Col>
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
