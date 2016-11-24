// WHO WILL BE TOP DOG??

import React, { Component } from 'react';
import classNames from 'classnames';

import Dog from './Dog';
import is404 from '../services/is404';
import styles from '../stylesheets/vote.css';
import arrow from '../assets/images/arrow.svg';

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
    this.randomDog = this.randomDog.bind(this);
    this.voteWithKey = this.voteWithKey.bind(this);
    this.check404 = this.check404.bind(this);
    this.newDogs = this.newDogs.bind(this);
  }

  componentWillMount() {
    this.setState({ showVoteAnim: 0 });
    document.addEventListener('keydown', this.voteWithKey);
  }

  componentWillReceiveProps() {
    this.newDogs();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.loading) {
      return false;
    }

    if (this.state.dog1 !== nextState.dog1 && this.state.dog2 !== nextState.dog2) {
      return true;
    } else if (this.state.showVoteAnim !== nextState.showVoteAnim) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.voteWithKey);
  }

  triggerAnim(dog) {
    this.setState({ showVoteAnim: dog });
    setTimeout(() => {
      this.setState({ showVoteAnim: 0 });
    }, 200);
  }

  vote(dog) {
    const { voteMethod, firebase } = this.props;

    if (dog === this.state.dog1) {
      this.triggerAnim(1);
      voteMethod(firebase, this.state.dog1, this.state.dog2);
    } else if (dog === this.state.dog2) {
      this.triggerAnim(2);
      voteMethod(firebase, this.state.dog2, this.state.dog1);
    }

    this.newDogs();
  }

  voteWithKey(event) {
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        this.vote(this.state.dog1);
      } else if (event.key === 'ArrowRight') {
        this.vote(this.state.dog2);
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
    // don't run this until we have data
    if (this.state && this.state.dog1 && this.state.dog2) {
      const dog1 = this.state.dog1;
      const dog2 = this.state.dog2;

      is404(dog1.photoSrc).catch(() => {
        this.vote(dog2);
        this.newDogs(1);
      });

      is404(dog2.photoSrc).catch(() => {
        this.vote(dog1);
        this.newDogs(2);
      });
    }
  }

  newDogs(only) {
    if (only === 1) {
      const dog2 = this.state.dog2;
      const dog1 = this.randomDog(dog2);
      this.setState({ dog1 });
    } else if (only === 2) {
      const dog1 = this.state.dog1;
      const dog2 = this.randomDog(dog1);
      this.setState({ dog2 });
    } else {
      const dog1 = this.randomDog();
      const dog2 = this.randomDog(dog1);
      this.setState({ dog1, dog2 });
    }

    this.check404();
  }

  render() {
    const { showVoteAnim } = this.state;

    return (
      <div className={ styles.voteContainer }>
        <button className={ styles.vote } onClick={ () => this.vote(this.state.dog1) }>
          <img
            className={ classNames(styles.voteIndicator, { [styles.active]: showVoteAnim === 1 }) }
            src={ arrow }
            alt="upvoted this dog"
          />
          <Dog dog={ this.state.dog1 } />
        </button>
        <button className={ styles.vote } onClick={ () => this.vote(this.state.dog2) }>
          <img
            className={ classNames(styles.voteIndicator, { [styles.active]: showVoteAnim === 2 }) }
            src={ arrow }
            alt="upvoted this dog"
          />
          <Dog dog={ this.state.dog2 } />
        </button>
      </div>
    );
  }
}

