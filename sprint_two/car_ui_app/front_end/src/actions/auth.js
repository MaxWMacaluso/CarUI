import axios from 'axios';
import { SIGN_IN, SIGN_OUT, BASE_API_URL } from '../utils/constants';
import { initiateGetProfile } from './profile';
import { history } from '../router/appRouter';
import { getErrors } from './errors';
import { setAuthHeader, removeAuthHeader } from '../utils/common';
import { post } from '../utils/api';

export const signIn = (user) => ({type: SIGN_IN, user});

export const signOut = () => ({type: SIGN_OUT});

//POSSIBLE ERROR
export const initiateLogin = (profile_name, password) => {
  return async (dispatch) => {
    try
    {
      const result = await axios.post(`${BASE_API_URL}/signin`, {profile_name, password});
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user));
      dispatch(initiateGetProfile(user.profile_name));
      history.push('/car_ui');
    }
    catch (error)
    {
      console.log('Error ', error);
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const initiateLogout = () => {
  return async (dispatch) => {
    try
    {
      setAuthHeader();
      await post(`${BASE_API_URL}/logout`, true, true)
      // Begin Peter edit
      // await post(`${BASE_API_URL}/logout2`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: {access_token: localStorage.getItem('user_token')}
      //
      // })
      // End Peter edit
      removeAuthHeader();
      localStorage.removeItem('user_token');
      return dispatch(signOut());
    }
    catch (error)
    {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

//Calling server API http://localhost:3001/singup by passing user data as second param to it
//Sends back object '{success: true}  as a result of API call
export const registerNewUser = (data) => {
  return async (dispatch) => {
    try
    {
      await axios.post(`${BASE_API_URL}/signup`, data);
      return { success: true };
    }
    catch (error)
    {
      console.log('Error ', error);
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};
