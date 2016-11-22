import 'core-js/fn/object/values';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/main.css';
import Vote from './Vote';
import Loading from './Loading';
import Standings from './Standings';
import { getAllDogsAsync } from '../actions/dogs';
import {
  updateRatingsAsync,
} from '../actions/ratings';
import { getOrCreateFirebaseClient } from '../actions/firebase';

const mapStateToProps = state => ({
  dogs: state.dogs,
  ratings: state.ratings,
  loading: state.loading,
  firebase: state.firebase,
});

const mapDispatchToProps = {
  getAllDogsAsync,
  updateRatingsAsync,
  getOrCreatFirebasenClient,
};

export class MainComponent extends Component {
  componentWillMount() {
    const firebase = this.props.getOrCreateFirebaseClient();
    this.props.getAllDogsAsync(firebase);
  }

  render() {
    const {
      dogs,
      loading,
      ratings,
      firebase,
      updateRatingsAsync,  // eslint-disable-line no-shadow
    } = this.props;

    return (
      <div>
        <Loading loading={ loading } />
        <Standings dogs={ dogs } ratings={ ratings } />
        <div className={ styles.voteWrapper }>
          <Vote dogs={ dogs } voteMethod={ updateRatingsAsync } firebase={ firebase } loading={ loading } />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainComponent);
