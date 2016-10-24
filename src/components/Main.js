import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../stylesheets/main.css';
import Dog from './Dog';
import { getAllDogsAsync } from '../actions/dogs';

const mapStateToProps = state => ({
  dogs: state.dogs,
});

const mapDispatchToProps = {
  getAllDogsAsync,
};

// Separately export the MainComponent so it can be tested without being wrapped by connect()
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
