import React from 'react';
import { connect } from 'react-redux';
import { initiateLogout } from '../actions/auth';
import Loading from '../components/Loading'


class Logout extends React.Component
{
  async componentDidMount()
  {
    const { dispatch } = this.props;
    dispatch(initiateLogout())
    await initiateLogout()
  }

  render()
  {
    return <Loading/>;
  }
};

export default connect()(Logout);
