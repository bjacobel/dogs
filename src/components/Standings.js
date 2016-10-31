import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from '../stylesheets/standings.css';

export default class Rankings extends Component {
  componentWillMount() {
    this.minidog = this.minidog.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.ratings !== nextProps.ratings;
  }

  minidog(id, i) {
    const { dogs } = this.props;
    const dog = dogs[id];

    return (
      <li key={ dog.id }>
        <Link to={ `/dog/${dog.id}` }>
          <div
            className={ styles.minidog }
            style={ {
              backgroundImage: `url('${dog.photoSrc}')`,
              right: `${i * 75}px`,
            } }
          />
        </Link>
      </li>
    );
  }

  render() {
    const ratings = this.props.ratings || [];

    return (
      <ol className={ styles.rankings }>
        { ratings.slice(0, 75).map((rating, i) => this.minidog(rating.id, i)) }
      </ol>
    );
  }
}
