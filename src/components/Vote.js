// WHO WILL BE TOP DOG??

import React, { Component } from 'react';

import Dog from './Dog';
import is404 from '../services/is404';
import styles from '../stylesheets/vote.css';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.randomDog = this.randomDog.bind(this);
    this.voteWithKey = this.voteWithKey.bind(this);
    this.check404 = this.check404.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.voteWithKey);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loading) {
      return false;
    } else if (
        this.dog1 &&
        this.dog2 &&
        nextProps.dogs[this.dog1.id] === this.dog1 &&
        nextProps.dogs[this.dog2.id] === this.dog2
      ) {
      return false;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.voteWithKey);
  }

  voteWithKey(event) {
    const { voteMethod, firebase } = this.props;

    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        voteMethod(firebase, this.dog1, this.dog2);
      } else if (event.key === 'ArrowRight') {
        voteMethod(firebase, this.dog2, this.dog1);
      }
    }
  }

  randomDog(except) {
    const { dogs } = this.props;
    const dogsCopy = Object.assign({}, dogs);

    if (except) {
      delete dogsCopy[except.id]; // can't get same dog twice
    }

    const ids = Object.keys(dogsCopy);
    return dogsCopy[ids[ids.length * Math.random() << 0]];  // eslint-disable-line no-bitwise
  }

  check404() {
    const { voteMethod, firebase } = this.props;

    // don't run this until we have data
    if (this.dog1 && this.dog2) {
      is404(this.dog1.photoSrc).catch(() => {
        voteMethod(firebase, this.dog2, this.dog1);
      });

      is404(this.dog2.photoSrc).catch(() => {
        voteMethod(firebase, this.dog1, this.dog2);
      });
    }
  }

  render() {
    const { voteMethod, firebase } = this.props;
    this.dog1 = this.randomDog();
    this.dog2 = this.randomDog(this.dog1);

    this.check404();

    return (
      <div className={ styles.voteContainer }>
        <button className={ styles.vote } onClick={ () => voteMethod(firebase, this.dog1, this.dog2) }>
          <div className={ styles.voteIndicator } />
          <Dog dog={ this.dog1 } />
        </button>
        <button className={ styles.vote } onClick={ () => voteMethod(firebase, this.dog2, this.dog1) }>
          <div className={ styles.voteIndicator } />
          <Dog dog={ this.dog2 } />
        </button>
      </div>
    );
  }
}

