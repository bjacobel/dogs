import React, { Component } from 'react';

import styles from '../stylesheets/dog.css';
import instagramLogo from '../assets/images/instagram.svg';

export default class Dog extends Component {
  render() {
    const { dog } = this.props;

    if (dog) {
      return (
        <div>
          <img className={ styles.dog } src={ dog.photoSrc } role="presentation" />
          <div className={ styles.metaBox }>
            <img className={ styles.authorPhoto } src={ dog.authorPhotoSrc } role="presentation" />
            <a className={ styles.authorName } href={ `https://instagram.com/${dog.authorName}` }>
              { dog.authorName }
            </a>
            <a href={ dog.link || `https://instagram.com/${dog.authorName}` } className={ styles.permalink }>
              <span className="sr-only">View on Instagram</span>
              <img className={ styles.instagramLogo } src={ instagramLogo } role="presentation" />
            </a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
