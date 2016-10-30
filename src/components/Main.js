import 'core-js/fn/object/values';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/main.css';
import Vote from './Vote';
import Loading from './Loading';
import { getAllDogsAsync } from '../actions/dogs';
import { updateRatingsAsync } from '../actions/ratings';

const mapStateToProps = state => ({
  dogs: state.dogs,
  rankings: state.rankings,
  loading: state.loading,
});

const mapDispatchToProps = {
  getAllDogsAsync,
  updateRatingsAsync,
};

export class MainComponent extends Component {
  componentWillMount() {
    this.props.getAllDogsAsync();
  }

  render() {
    const {
      dogs,
      loading,
      updateRatingsAsync,  // eslint-disable-line no-shadow
    } = this.props;

    return (
      <div>
        <Loading loading={ loading } />
        <div className={ styles.voteWrapper }>
          <Vote dogs={ dogs } voteMethod={ updateRatingsAsync } loading={ loading } />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainComponent);
