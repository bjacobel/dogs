import 'core-js/fn/object/values';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/main.css';
import Vote from './Vote';
import { getAllDogsAsync } from '../actions/dogs';
import { updateRankingsAsync } from '../actions/rankings';

const mapStateToProps = state => ({
  dogs: state.dogs,
  rankings: state.rankings,
});

const mapDispatchToProps = {
  getAllDogsAsync,
  updateRankingsAsync,
};

export class MainComponent extends Component {
  componentWillMount() {
    this.props.getAllDogsAsync();
  }

  render() {
    const { dogs } = this.props;

    return (
      <div className={ styles.voteWrapper }>
        <Vote dogs={ dogs } rankings={ {} } voteMethod={ updateRankingsAsync } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
