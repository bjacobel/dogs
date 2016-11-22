import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from '../stylesheets/dogPage.css';
import Dog from './Dog';
import { getSpecificDogAsync } from '../actions/dogs';
import { getOrCreateFirebaseClient } from '../actions/firebase';

const mapStateToProps = state => ({
  dogs: state.dogs,
});

const mapDispatchToProps = {
  getSpecificDogAsync,
  getOrCreateFirebaseClient,
};

export class DogPageComponent extends Component {
  componentWillMount() {
    const { params, dogs } = this.props;
    if (!dogs[params.id]) {
      this.props.getSpecificDogAsync(this.props.getOrCreateFirebaseClient(), params.id);
    }
  }

  render() {
    const { dogs, params } = this.props;
    const dog = dogs[params.id];

    return (
      <div className={ styles.dogStandalone }>
        <Link to="/" className={ styles.homeLink }>← Home</Link>
        <Dog dog={ dog } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DogPageComponent);
