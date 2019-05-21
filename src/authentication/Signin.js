import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import '../assets/scss/auth.scss';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = event => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
        toast.warn('wrong email or password')
      });

      event.preventDefault();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render(){
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return(
      <div className='unauth-wrapper'>
        <Row className='justify-content-center' style={{ height: '100%' }}>
          <Col xs={8}>
            <div className='form-outer-wrap'>
              <div style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon='fish' className='whale-icon' />
              </div>
              <div className='form-title'>
                whaler
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className='signin form-wrapper'>
                  <Form.Control
                    type="email" placeholder="name@example.com"
                    name="email" value={email}
                    onChange={this.handleChange} />
                  <Form.Control
                    type="password" placeholder="password"
                    name="password" value={password}
                    onChange={this.handleChange} />
                </Form.Group>
                <div style={{ textAlign: 'middle' }}>
                 <div>
                    <Button variant='yellow' type="submit">Login</Button>
                  </div>
                  <div className='float-text'>
                    or
                  </div>
                  <div>
                    <Link to='/signup'>
                      <Button variant='yellow'>Create an Account</Button>
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Signin;
