import React, { Component } from 'react';
import { Match, Miss, BrowserRouter } from 'react-router';
import ReactGA from 'react-ga';

import NotFound from './NotFound';
import DogPage from './DogPage';
import Main from './Main';

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export default class Routes extends Component {
  componentWillMount() {
    ReactGA.initialize('UA-34138258-6');
  }

  render() {
    return (
      <BrowserRouter onUpdate={ logPageView }>
        <div>
          <Match pattern="/" exactly component={ Main } />
          <Match pattern="/dog/:id" component={ DogPage } />
          <Miss component={ NotFound } />
        </div>
      </BrowserRouter>
    );
  }
}
