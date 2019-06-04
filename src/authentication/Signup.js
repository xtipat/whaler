import React from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as yup from 'yup';
import '../assets/scss/auth.scss';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  errors: null,
};



class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = event => {
    auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
        var date = {
            day: new Date().getDate(),
           month: new Date().getMonth()+1,
           year: new Date().getFullYear()
        }
        db.doCreateUser(authUser.user.uid, this.state.username, this.state.email, date)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    const schema = yup.object({
      username: yup.string()
      .min(3, 'must be between 3-10 characters')
      .max(10, 'must be between 3-10 characters')
      .required('Required')
      ,
      email: yup.string().email('Invalid Email').required('Required'),
      password: yup.string().min(6, 'should be at least 6 characters').required('Required'),
      passwordConfirm: yup.string()
      .oneOf([this.state.password], 'Passwords must match')
      .required('Required'),
    });

    return(
      <div className='unauth-wrapper'>
        <Row className='justify-content-center' style={{ height: '100%' }}>
          <Col xs={8}>
            <div className='form-outer-wrap'>
              <div className='form-title'>
                sign up
              </div>
                <Formik
                  validationSchema={schema}
                  onSubmit={this.handleSubmit}
                  initialValues={ INITIAL_STATE }
                  >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <div className='signup form-wrapper'>
                      <Form.Group>
                        <Form.Control
                          type='text'
                          name='email'
                          value={values.email}
                          onChange={(e) => {this.handleChange(e); handleChange(e)}}
                          placeholder='email@example.com'
                          isInvalid={touched.email && !!errors.email}
                          />
                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type='text'
                              name='username'
                              value={values.username}
                              onChange={(e) => {this.handleChange(e); handleChange(e)}}
                              placeholder='username'
                              isInvalid={touched.username && !!errors.username}
                              />
                            <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                          </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type='password'
                          name='password'
                          value={values.password}
                          onChange={(e) => {this.handleChange(e); handleChange(e)}}
                          placeholder='password'
                          isInvalid={touched.password && !!errors.password}
                          />
                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type='password'
                          name='passwordConfirm'
                          value={values.passwordConfirm}
                          onChange={(e) => {this.handleChange(e); handleChange(e)}}
                          placeholder='confirm password'
                          isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                          />
                        <Form.Control.Feedback type='invalid'>{errors.passwordConfirm}</Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <Form.Group style={{ textAlign: 'middle' }}>
                      <Link to='/signin'>
                        <Button variant='white'>Back</Button>
                      </Link>
                      <div className='divider' />
                      <Button variant='yellow' type="submit">Create an Account</Button>
                    </Form.Group>
                  </Form>

                )}
                </Formik>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Signup;
