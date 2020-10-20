//Logs in an existing user and gives option to register new user

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { initiateLogin } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

//Eveyrthing below are methods to Login class
class Login extends React.Component {
    state = {
        profile_name: '',
        password: '',
        error_msg: ''
};

componentDidUpdate(prevProps) 
{
  if (!_.isEqual(prevProps.errors, this.props.errors)) 
  {
    this.setState({ error_msg: this.props.errors });
  }
}

componentWillUnmount() 
{
  this.props.dispatch(resetErrors());
}

handleLogin = (event) => {
    event.preventDefault();
    const {profile_name, password} = this.state;
    const fieldsToValidate = [{profile_name}, {password}];
    const allFieldsEntered = validateFields(fieldsToValidate);
    
    if (!allFieldsEntered) 
    {
      this.setState({error_msg: { signin_error: 'Please enter all the fields'}});
    } 
    //Login successful
    else 
    {
      this.setState({ error_msg: { signin_error: '' }}); 
      this.props.dispatch(initiateLogin(profile_name, password));
    }
};

handleInputChange = (event) => {
  const {name, value} = event.target;
  this.setState({[name]: value});
};

render() {
    const {error_msg} = this.state;
    return (
      <div className="login-page">
        <h1>Login or Create Create an Account!</h1>
        <div className="login-form">
          <Form onSubmit={this.handleLogin}>
            {error_msg && error_msg.signin_error && (<p className="error_msg centered-message">{error_msg.signin_error}</p>)}
            <Form.Group controlId="profile_name">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control
                type="text"
                name="profile_name"
                placeholder="Enter Profile Name"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register_user" className="btn btn-secondary">
                Create account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({errors: state.errors});

export default connect(mapStateToProps)(Login);