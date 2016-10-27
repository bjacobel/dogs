import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from '../stylesheets/dog.css';

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
            <Link to={ `/dog/${dog.id}` } className={ styles.permalink }>Permalink</Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
