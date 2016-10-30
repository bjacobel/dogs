// WHO WILL BE TOP DOG??

import React, { Component } from 'react';

import Dog from './Dog';
import styles from '../stylesheets/vote.css';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.randomDog = this.randomDog.bind(this);
    this.voteWithKey = this.voteWithKey.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.voteWithKey);
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.loading;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.voteWithKey);
  }

  voteWithKey(event) {
    const { voteMethod } = this.props;

    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        voteMethod(this.dog1, this.dog2);
      } else if (event.key === 'ArrowRight') {
        voteMethod(this.dog2, this.dog1);
      }
    }
  }

  randomDog(except) {
    const { dogs } = this.props;
    if (except) {
      delete dogs[except.id]; // can't get same dog twice
    }

    const ids = Object.keys(dogs);
    return dogs[ids[ids.length * Math.random() << 0]];  // eslint-disable-line no-bitwise
  }

  render() {
    const { voteMethod } = this.props;
    this.dog1 = this.randomDog();
    this.dog2 = this.randomDog(this.dog1);

    return (
      <div className={ styles.voteContainer }>
        <button className={ styles.vote } onClick={ () => voteMethod(this.dog1, this.dog2) }>
          <Dog dog={ this.dog1 } />
        </button>
        <button className={ styles.vote } onClick={ () => voteMethod(this.dog2, this.dog1) } >
          <Dog dog={ this.dog2 } />
        </button>
      </div>
    );
  }
}

