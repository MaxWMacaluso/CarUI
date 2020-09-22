//Entry point to React

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //Importing main App component which wraps around everything
import * as serviceWorker from './serviceWorker'; //(Progressive web-app/offline content)

//Rendering App Component into element with ID of 'root' (div in index.html)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 