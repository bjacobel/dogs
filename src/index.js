import 'core-js/fn/object/values';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReactGA from 'react-ga';

import reducer from './reducers';
import Routes from './components/Routes';
import {
  SHOW_DEV_TOOLS,
  TRACK_ANALYTICS,
  GA_ID,
} from './constants';

const composeEnhancers = (SHOW_DEV_TOOLS && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line max-len, no-underscore-dangle

const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(...[thunk]),
));

if (TRACK_ANALYTICS) {
  ReactGA.initialize(GA_ID);
}

const rootEl = document.getElementById('main');
const render = () => {
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
