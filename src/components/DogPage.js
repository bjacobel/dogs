import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/dogPage.css';
import Dog from './Dog';
import { getSpecificDogAsync } from '../actions/dogs';

const mapStateToProps = state => ({
  dogs: state.dogs,
});

const mapDispatchToProps = {
  getSpecificDogAsync,
};

export class DogPageComponent extends Component {
  componentWillMount() {
    const { params, dogs } = this.props;
    if (!dogs[params.id]) {
      this.props.getSpecificDogAsync(params.id);
    }
  }

  render() {
    const { dogs, params } = this.props;
    const dog = dogs[params.id];

    return (
      <div className={ styles.dogStandalone }>
        <Dog dog={ dog } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DogPageComponent);
