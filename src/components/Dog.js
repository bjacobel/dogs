import React, { Component } from 'react';

import styles from '../stylesheets/dog.css';

export default class Dog extends Component {
  render() {
    const { dog } = this.props;
    return (
      <div>
        <img className={ styles.dog } src={ dog.photoSrc } role="presentation" />
      </div>
    );
  }
}
