
import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';
import { history } from '../router/appRouter';
import { UPDATE_PROFILE } from '../utils/constants';
import { get, post } from '../utils/api';
import { setAuthHeader } from '../utils/common';

export const updateProfile = (profile) => ({type: UPDATE_PROFILE, profile});

//POSSIBLE ERROR HERE
export const initiateUpdateProfile = (profileData) => {
  return async (dispatch) => {
    try
    {
      const profile = await post(`${BASE_API_URL}/profile`, profileData);
      dispatch(updateProfile(profile.data));
      history.push('/profile');
    }
    catch (error)
    {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const initiateGetProfile = () => {
  return async (dispatch) => {
    try
    {
      setAuthHeader();
      const profile = await get(`${BASE_API_URL}/profile`);
      dispatch(updateProfile(profile.data));
    }
    catch (error)
    {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const getProfile = () => {
  return new Promise(function(resolve, reject) {
    get(`${BASE_API_URL}/profile`).then(res => {
      // console.log(res.data);

      resolve(res.data);
    }).catch(err=>{ reject(err) })
  })
}
