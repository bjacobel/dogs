import React, { Component } from 'react';
import { Link } from 'react-router';

import { notFound } from '../stylesheets/notFound.css';
import { link } from '../stylesheets/link.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className={ notFound }>
        <h1>404: page not found</h1>
        <Link className={ link } to="/">Home</Link>
      </div>
    );
  }
}
