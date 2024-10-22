import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { getProfile } from '../actions/profile';
import Loading from '../components/Loading'
import { Navbar, Nav } from 'react-bootstrap';

//TODO: Don't need?
//import { initiateGetProfile } from '../actions/profile';

import { useDispatch } from 'react-redux'

const dispatch = useDispatch;

const Header = () => {
  const [profile, setProfile] = useState(
    {
      profile_name: null,
      error_msg: '',
      is_submitted: false
    }
  );
  //       this.props.dispatch(initiateGetProfile());
  const [tick, setTick] = useState(false);

  useEffect(() => {
    if (tick == 0) {
      getProfile().then(res => {
        // console.log("heee")
        // console.log(res);
        setProfile(res)
        // console.log(profile)
      })
      // dispatch()
    }
    setTick(1)
  });

  if (profile.profile_name == null) {
    return <Loading/>
  }

  console.log(window.location.pathname);
  if (window.location.pathname == '/')
    window.location.pathname = '/car_ui'
    
  return (
    <Navbar className = "navbar">
    <Nav.Item><strong>Logged in as: {profile.profile_name}</strong></Nav.Item>

    {/* Added button to perform same function. TODO: Determine if need? */}
    {/* <Nav.Item className="ml-auto"><Link to="/logout" className="link">Logout</Link></Nav.Item> */}

    </Navbar>
  );
};

export default Header;
