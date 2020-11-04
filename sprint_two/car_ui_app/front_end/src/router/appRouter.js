//NOTES:
    //In JSX, class is replaced by className
    //JS in curly braces

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';

//Pages
import LoginPage from '../pages/login_page' //Done
import CreateProfilesPage from '../pages/create_profile' //Done
import CarUIPage from '../pages/carUI_page'
import NotFoundPage from '../pages/404'; //Done
import ProfilesPage from '../pages/profile_page';
import Logout from '../pages/logout_page';

//Components
import Header from '../components/Header';

//TODO: Don't need?
//import Loading from '../components/Loading';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
  // const user_token = localStorage.getItem('user_token');;

  // if (_.isEmpty(auth.token) && !_.isEmpty(localStorage.getItem('user_token'))) {
  //   auth.token = localStorage.getItem('user_token');
  // }
  // {!_.isEmpty(user_token) && <Header />}
  return (
    <Router history={history}>
      <div>
      {!_.isEmpty(auth.token) &&  <Header/>}

        <div className="container">
        <Switch>

            <Route exact path="/" component={LoginPage}/>
            <Route path="/register_user" component={CreateProfilesPage}/>
            <Route path="/profile" component={ProfilesPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/car_ui" component={CarUIPage}/>

            {/* Goes here if none are triggered; AT BOTTOM */}
            <Route exact path='/404' component={NotFoundPage}/>
        </Switch>
      </div>
    </div>
    </Router>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth
// })

const mapStateToProps = (state) => {
  if (_.isEmpty(state.auth.token) && !_.isEmpty(localStorage.getItem('user_token'))) {
    state.auth.token = localStorage.getItem('user_token');
  }
  return ({
  auth: state.auth
});
}

export default connect(mapStateToProps)(AppRouter);