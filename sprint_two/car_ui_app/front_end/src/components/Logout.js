import React from 'react';
import { connect } from 'react-redux';
import { initiateLogout } from '../actions/auth';
import Loading from '../components/Loading'


class Logout extends React.Component
{
  async componentDidMount()
  {
    const { history, dispatch } = this.props;
    dispatch(initiateLogout())
    await initiateLogout()
    history.push('/')
    // dispatch(initiateLogout()).then(() => history.push('/'));
  }

  render()
  {
    return <Loading/>;
  }
}

export default connect()(Logout);
