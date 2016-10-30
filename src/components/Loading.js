import React, { Component } from 'react';

import {
  spinner,
  spinnerContainer,
} from '../stylesheets/loading.css';

export default class Loading extends Component {
  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div className={ spinnerContainer } >
          <div className={ spinner } />
        </div>
      );
    } else {
      return null;
    }
  }
}
