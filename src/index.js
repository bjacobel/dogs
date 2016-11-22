import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactGA from 'react-ga';

import reducer from './reducers';
import {
  SHOW_DEVTOOLS,
  TRACK_ANALYTICS,
  GA_ID,
} from './constants';

const composeEnhancers = (SHOW_DEVTOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk]),
));

if (TRACK_ANALYTICS) {
  ReactGA.initialize(GA_ID);
}

const rootEl = document.getElementById('main');
const render = () => {
  // See here for explanation of why this require() is needed:
  // https://github.com/reactjs/redux/pull/1455/files#r54380102
  const Routes = require('./components/Routes').default; // eslint-disable-line global-require

  ReactDOM.render(
    <Provider store={ store }>
      <Routes />
    </Provider>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/Routes', () => {
    render();
  });
}

render();
