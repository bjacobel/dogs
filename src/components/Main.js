import 'core-js/fn/object/values';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/main.css';
import Vote from './Vote';
import Loading from './Loading';
import Standings from './Standings';
import { getAllDogsAsync } from '../actions/dogs';
import { updateRatingsAsync } from '../actions/ratings';
import { getOrCreateHorizonClient } from '../actions/horizon';

const mapStateToProps = state => ({
  dogs: state.dogs,
  ratings: state.ratings,
  loading: state.loading,
  horizon: state.horizon,
});

const mapDispatchToProps = {
  getAllDogsAsync,
  updateRatingsAsync,
  getOrCreateHorizonClient,
};

export class MainComponent extends Component {
  componentWillMount() {
    this.props.getAllDogsAsync(this.props.getOrCreateHorizonClient());
  }

  render() {
    const {
      dogs,
      loading,
      ratings,
      horizon,
      updateRatingsAsync,  // eslint-disable-line no-shadow
    } = this.props;

    return (
      <div>
        <Loading loading={ loading } />
        <Standings dogs={ dogs } ratings={ ratings } />
        <div className={ styles.voteWrapper }>
          <Vote dogs={ dogs } voteMethod={ updateRatingsAsync } horizon={ horizon } loading={ loading } />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainComponent);
