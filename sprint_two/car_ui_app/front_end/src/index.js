//Entry point to React

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/appRouter';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

const rootElement = document.getElementById('root');

//Rendering App Component into element with ID of 'root' (div in index.html)
ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  rootElement
);