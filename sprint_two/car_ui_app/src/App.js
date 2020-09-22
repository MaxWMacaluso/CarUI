import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

import Todos from './components/Todos'; //'./' is current folder

//In JSX, class is replaced by className
//JS in curly braces

//Pages
import profilesPage from './pages/profiles' //Done
import createProfilesPage from './pages/create_profile' //Done
import carUIPage from './pages/car_ui'
import uploadImgPage from './pages/upload_img'
import editImgPage from './pages/edit_img'

import notFoundPage from './pages/404'; //Done

function App() {
  return (
    //Router object can only have ONE child
    <Router>
      <Switch>
        <Route exact path="/" component={profilesPage}/>
        <Route exact path="/create_profile" component={createProfilesPage}/>
        <Route exact path="/car_ui" component={carUIPage}/>
        <Route exact path="/upload_img" component={uploadImgPage}/>
        <Route exact path="/edit_img" component={editImgPage}/>

        {/* Goes here if none other is triggered; AT BOTTOM */}
        <Route exact path='/404' component={notFoundPage}/>
        <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
