/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';

export class DogPageComponent extends Component {
  render() {
    return null;
  }
}

export default class DogPage extends Component {
  render() {
    return <DogPageComponent />;
  }
}

