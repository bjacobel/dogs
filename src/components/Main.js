import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';
import { getAllDogsAsync } from '../actions/dogs';

const mapStateToProps = state => ({
  title: state.title,
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
      <div>
        <pre>{ dogs }</pre>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
