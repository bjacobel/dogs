import 'core-js/fn/object/values';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/main.css';
import Vote from './Vote';
import { getAllDogsAsync } from '../actions/dogs';
import { updateRatingsAsync } from '../actions/ratings';

const mapStateToProps = state => ({
  dogs: state.dogs,
  rankings: state.rankings,
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
      updateRatingsAsync,  // eslint-disable-line no-shadow
    } = this.props;

    return (
      <div className={ styles.voteWrapper }>
        <Vote dogs={ dogs } voteMethod={ updateRatingsAsync } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
