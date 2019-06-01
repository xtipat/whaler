import React, { Component } from 'react';
import { db, storage, firebaseConfig } from '../firebase/firebase.js';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import MapPage from '../MapPage.js';
import Loader from './Loader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import { FirebaseDatabaseProvider, FirebaseDatabaseTransaction } from "@react-firebase/database";
import '../assets/scss/modal.scss';

const styles = {
  modalContentWrap: {
    background: 'white',
    width: '100%',
    padding: '20px',
  },
  colors: {
    primary: '#FEC93F'
  }
}

export class DetRjct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      show: false
    };
  };

  onClose(){
    this.props.onHide();
    this.setState({
      loaded: false
    });
  }

  render() {
      return (
        <Modal
          size="sm"
          {...this.props}
          centered
        >
          <Tab.Container defaultActiveKey="details">
          <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
            <div style={{ textAlign: 'right', width: '100%'}}>
              <div className='custom-close-wrap' onClick={ this.onClose.bind(this) }>
                <div className='custom-close-label'>close</div>
                <FontAwesomeIcon icon='times-circle' className='custom-close-icon'/>
              </div>
            </div>
          </Modal.Header>
            <Modal.Body style={{ padding: 0, background: styles.colors.primary }}>
              <Tab.Content>
                <Tab.Pane eventKey="details" style={ styles.modalContentWrap }>
                Details of this bin were rejected.<br/>You earned 20 points!
                <div>
                <Button ref={this.locAcptBtn} variant="yellow" onClick={() => {
                }}>
                Redeem
                </Button>
                <div className="divider"></div>
                <Button ref={this.locAcptBtn} variant="yellow" onClick={() => {

                }}>
                View Result
                </Button>
                </div>
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      )
    }
  }

  export class DetAcpt extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        loaded: false,
        show: false
      };
    };

    onClose(){
      this.props.onHide();
      this.setState({
        loaded: false
      });
    }

    render() {
        return (
          <Modal
            size="sm"
            {...this.props}
            centered
          >
            <Tab.Container defaultActiveKey="details">
              <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
                <div style={{ textAlign: 'right', width: '100%'}}>
                  <div className='custom-close-wrap' onClick={ this.props.onHide }>
                    <div className='custom-close-label'>close</div>
                    <FontAwesomeIcon icon='times-circle' className='custom-close-icon'/>
                  </div>
                </div>
              </Modal.Header>
              <Modal.Body style={{ padding: 0, background: styles.colors.primary }}>
                <Tab.Content>
                  <Tab.Pane eventKey="details" style={ styles.modalContentWrap }>
                  Details of this bin were accepted.<br/>You earned 20 points!
                  <div>
                  <Button variant="yellow" onClick={() => {
                  }}>
                  Redeem
                  </Button>
                  <div className="divider"></div>
                  <Button variant="yellow" onClick={() => {
                  }}>
                  View Result
                  </Button>
                  </div>
                  </Tab.Pane>
                </Tab.Content>
              </Modal.Body>
            </Tab.Container>
          </Modal>
        )
      }
    }

export class LocRjct extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          loaded: false,
          show: false
        };
      };

      onClose(){
        this.props.onHide();
        this.setState({
          loaded: false
        });
      }

      render() {
          return (
            <Modal
              size="sm"
              {...this.props}
              centered
            >
              <Tab.Container defaultActiveKey="details">
              <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
                <div style={{ textAlign: 'right', width: '100%'}}>
                  <div className='custom-close-wrap' onClick={ this.onClose.bind(this) }>
                    <div className='custom-close-label'>close</div>
                    <FontAwesomeIcon icon='times-circle' className='custom-close-icon'/>
                  </div>
                </div>
              </Modal.Header>
                <Modal.Body style={{ padding: 0, background: styles.colors.primary }}>
                  <Tab.Content>
                    <Tab.Pane eventKey="details" style={ styles.modalContentWrap }>
                    Location of this bin were rejected.<br/>You earned 20 points!
                    <div>
                    <Button variant="yellow" onClick={() => {

                    }}>
                    Redeem
                    </Button>
                    <div className="divider"></div>
                    <Button variant="yellow" onClick={() => {

                    }}>
                    Next
                    </Button>
                    </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Modal.Body>
              </Tab.Container>
            </Modal>
          )
        }
      }

export class LocAcpt extends React.Component {
        constructor(props){
          super(props);
          this.state = {
            loaded: false,
            show: false
          };
        };

        onClose(){
          this.props.onHide();
          this.setState({
            loaded: false
          });
        }

        render() {
            return (
              <Modal
                size="sm"
                {...this.props}
                centered
              >
                <Tab.Container defaultActiveKey="details">
                  <Modal.Header style={{ background: styles.colors.primary, border: 'none' }}>
                    <div style={{ textAlign: 'right', width: '100%'}}>
                      <div className='custom-close-wrap' onClick={ this.props.onHide }>
                        <div className='custom-close-label'>close</div>
                        <FontAwesomeIcon icon='times-circle' className='custom-close-icon'/>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Body style={{ padding: 0, background: styles.colors.primary }}>
                    <Tab.Content>
                      <Tab.Pane eventKey="details" style={ styles.modalContentWrap }>
                      Location of this bin were accepted.<br/>You earned 20 points!
                      <div>
                      <Button variant="yellow" onClick={() => {
                      }}>
                      Redeem
                      </Button>
                      <div className="divider"></div>
                      <Button variant="yellow" onClick={() => {
                      }}>
                      Next
                      </Button>
                      </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Modal.Body>
                </Tab.Container>
              </Modal>
            )
          }
        }
