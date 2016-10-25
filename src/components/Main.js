import 'core-js/fn/object/values';

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import styles from '../stylesheets/main.css';
import Dog from './Dog';
import { getAllDogsAsync } from '../actions/dogs';

const mapStateToProps = state => ({
  dogs: state.dogs,
});

const mapDispatchToProps = {
  getAllDogsAsync,
};

export class MainComponent extends Component {
  componentWillMount() {
    this.props.getAllDogsAsync();
  }

  render() {
    const { dogs } = this.props;

    return (
      <ul>
        { Object.values(dogs).map(dog => (
          <li key={ dog.id }>
            <Dog dog={ dog } />
          </li>
        )) }
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
