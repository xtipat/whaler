import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Tab, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/scss/modal.scss';

const styles = {
  modalContentWrap: {
    background: 'white',
    width: '100%',
    padding: '20px',
    textAlign: 'center'
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
                <NavLink to='/redeem'>
                  <Button variant="yellow">Redeem</Button>
                </NavLink>
                <div className="divider"></div>
                <Button variant="black" onClick={() => {
                  this.props.onHide();
                  this.props.result();
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
                  <NavLink to='/redeem'>
                    <Button variant="yellow">Redeem</Button>
                  </NavLink>
                  <div className="divider"></div>
                  <Button variant="black" onClick={() => {
                    this.props.onHide();
                    this.props.result();
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
                    <NavLink to='/redeem'>
                      <Button variant="yellow">Redeem</Button>
                    </NavLink>
                    <div className="divider"></div>
                    <Button variant="black" onClick={()=>{
                      this.props.onHide();
                      this.props.next();
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
                      <NavLink to='/redeem'>
                        <Button variant="yellow">Redeem</Button>
                      </NavLink>
                      <div className="divider"></div>
                      <Button variant="black" onClick={() => {
                        this.props.onHide();
                        this.props.next();
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
