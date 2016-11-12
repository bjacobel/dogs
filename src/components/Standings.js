import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { Link } from 'react-router';

import styles from '../stylesheets/standings.css';

const showRatings = 40;

export default class Rankings extends Component {
  minidog(id) {
    const { dogs } = this.props;
    const dog = dogs[id];

    return (
      <li
        key={ dog.id }
        className={ styles.minidog }
      >
        <Link to={ `/dog/${dog.id}` }>
          <div className={ styles.minidogPic } style={ { backgroundImage: `url('${dog.photoSrc}')` } } />
        </Link>
      </li>
    );
  }

  render() {
    const ratings = this.props.ratings || [];

    return (
      <FlipMove
        typeName="ol"
        className={ styles.standings }
        enterAnimation="accordianHorizontal"
        leaveAnimation="accordianHorizontal"
      >
        { ratings.slice(0, showRatings).map((rating, i) => this.minidog(rating.id, i)) }
      </FlipMove>
    );
  }
}
