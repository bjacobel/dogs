// WHO WILL BE TOP DOG??

import React, { Component } from 'react';

import Dog from './Dog';
import styles from '../stylesheets/vote.css';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.randomDog = this.randomDog.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const currentProps = this.props;
    return currentProps.rankings !== nextProps.rankings;
  }

  randomDog(except) {
    const { dogs } = this.props;
    if (except) {
      delete dogs[except.id]; // can't get same dog twice
    }

    const dogIds = Object.keys(dogs);
    return dogs[dogIds[dogIds.length * Math.random() << 0]];  // eslint-disable-line no-bitwise
  }

  render() {
    const randomDog1 = this.randomDog();
    const randomDog2 = this.randomDog(randomDog1);

    return (
      <div className={ styles.voteContainer }>
        <div className={ styles.vote } >
          <Dog dog={ randomDog1 } />
        </div>
        <div className={ styles.vote } >
          <Dog dog={ randomDog2 } />
        </div>
      </div>
    );
  }
}

