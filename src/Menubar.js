import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zoomIn } from 'react-animations';
import styled, {keyframes} from 'styled-components';
import './assets/scss/menubar.scss';
import MenuHere from './components/MenuHere.js'
import MenuLocate from './components/MenuLocate.js'

const Zoom = styled.div `animation: 0.3s ${keyframes `${zoomIn}`}`;
class Menubar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      plusButtonClass: 'plus-icon',
    }

    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
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

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleClose()
    }
  }

  render(){
    return(
      <div ref={this.setWrapperRef}>
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
                  size='5x'/>
              </div>
              {
                this.state.plusButtonClass === 'plus-icon' ? <div />:
                  <div>
                    <Row className='justify-content-center'>
                      <Col>
                        <Zoom>
                          <MenuHere onClick={ this.handleClose } uid = {this.props.auth.uid}/>
                          <MenuLocate onClick={ this.handleClose } uid = {this.props.auth.uid}/>
                        </Zoom>
                      </Col>
                    </Row>
                    <Zoom>
                      <div className='extend-label-wrap'>
                        <div className='extend-label-text'>Add a new Bin</div>
                      </div>
                    </Zoom>
                  </div>
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Menubar;
