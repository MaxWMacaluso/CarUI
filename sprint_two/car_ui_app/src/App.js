import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

import Todos from './components/Todos'; //'./' is current folder

//In JSX, class is replaced by className
//JS in curly braces

//Pages
import MainPage from './pages/index'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage}/>

        {/* Goes here if none other is triggered */}
        <Route component={MainPage}/>
      </Switch>
    </Router>
  );
}

export default App;
