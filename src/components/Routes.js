import React, { Component } from 'react';
import { Match, Miss, BrowserRouter } from 'react-router';

import NotFound from './NotFound';
import DogPage from './DogPage';
import Main from './Main';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match pattern="/" exactly component={ Main } />
          <Match pattern="/dog/:id" component={ DogPage } />
          <Miss component={ NotFound } />
        </div>
      </BrowserRouter>
    );
  }
}
