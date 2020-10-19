import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { initiateUpdateProfile } from '../actions/profile';
import { validateFields } from '../utils/common';
import { resetErrors } from '../actions/errors';

class Profile extends React.Component {
  state = {
    profile_name: '',
    error_msg: '',
    is_submitted: false
  };

  componentDidMount() 
  {
    const { profile } = this.props;
    if (!_.isEmpty(profile)) 
    {
      const {profile_name} = profile;
      this.setState({profile_name,});
    }
  }

  componentDidUpdate(prevProps) 
  {
    if (!_.isEqual(prevProps.errors, this.props.errors)) 
    {
      this.setState({error_msg: this.props.errors});
    }
    if (!_.isEqual(prevProps.profile, this.props.profile)) 
    {
      const { profile_name} = this.props.profile;
      this.setState({ profile_name});
    }
  }

  componentWillUnmount() 
  {
    this.props.dispatch(resetErrors());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { profile_name} = this.state;
    const profileData = {profile_name};

    const fieldsToValidate = [{ profile_name }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) 
    {
      this.setState({error_msg: { update_error: 'Please enter all the fields.'}});
    } 
    else 
    {
      this.setState({ is_submitted: true, error_msg: '' });
      this.props.dispatch(initiateUpdateProfile(profileData));
    }
  };

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  render() {
    const { error_msg, profile_name, is_submitted } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <Form onSubmit={this.handleSubmit} className="profile-form">
          {error_msg && error_msg.update_error ? (
            <p className="error_msg centered-message">{error_msg.update_error}</p>
          ) : (
            is_submitted && (
              <p className="successMsg centered-message">
                Profile updated successfully.
              </p>
            )
          )}
          <Form.Group controlId="profile_name">
            <Form.Label>Profile Name:</Form.Label>
            <Form.Control
              type="text"
              name="profile_name"
              placeholder="Enter your profile name"
              value={profile_name}
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({profile: state.profile, errors: state.errors});

export default connect(mapStateToProps)(Profile);