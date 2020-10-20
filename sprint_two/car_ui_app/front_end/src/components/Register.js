//Registers a new user

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { registerNewUser } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    state = {
        profile_name: '',
        password: '',
        confirm_password: '',
        success_msg: '',
        error_msg: '',
        is_submitted: false
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

    registerUser = (event) => {
        event.preventDefault();
        
        const {profile_name, password, confirm_password} = this.state;
        const fieldsToValidate = [{profile_name}, {password}, {confirm_password}];
        const allFieldsEntered = validateFields(fieldsToValidate);
        
        if (!allFieldsEntered) 
        {
            this.setState({error_msg: {signup_error: 'Please enter all the fields'}});
        } 
        //If all fields are entered
        else 
        {
            //If password not entered correctly
            if (password !== confirm_password) 
            {
                this.setState({error_msg: {signup_error: 'Password and confirm password does not match'}});
            } 
            //Everything correct, so accept it
            else 
            {
                this.setState({is_submitted: true});
                this.props.dispatch(registerNewUser({profile_name, password})).then((response) => {
                if (response.success) 
                {
                    this.setState({success_msg: 'User registered successfully.', error_msg: ''});
                }
                });
            }
        }
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {error_msg, success_msg, is_submitted} = this.state;
        return (
        <div className="login-page">
            <h2>Register User</h2>
            <div className="login-form">
            <Form onSubmit={this.registerUser}>
                {error_msg && error_msg.signup_error ? (<p className="error_msg centered-message">{error_msg.signup_error}</p>) : (is_submitted && (<p className="success_msg centered-message">{success_msg}</p>))}
                <Form.Group controlId="profile_name">
                <Form.Label>Profile name</Form.Label>
                <Form.Control
                    type="text"
                    name="profile_name"
                    placeholder="Profile name"
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
                <Form.Group controlId="confirm_password">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    name="confirm_password"
                    placeholder="Enter confirm password"
                    onChange={this.handleInputChange}
                />
                </Form.Group>
                <div className="action-items">
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Link to="/" className="btn btn-secondary">
                    Login
                </Link>
                </div>
            </Form>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({errors: state.errors});
  
export default connect(mapStateToProps)(Register);
