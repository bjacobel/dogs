import ReactGA from 'react-ga';

import calculateElo from '../services/elo';
import {
  updateRating,
  watchRatings,
} from '../serfirebase';
import {
  loadingStarted,
  loadingEnded,
} from './loading';

export const UPDATE_RATING_FAILED = 'UPDATE_RATING_FAILED';
export const UPDATE_RATING_SUCCEEDED = 'UPDATE_RATING_SUCCEEDED';

export const updateRatingSucceeded = (id, rating) => {
  return { type: UPDATE_RATING_SUCCEEDED, payload: { id, rating } };
};

export const updateRatingFailed = (error) => {
  return { type: UPDATE_RATING_FAILED, payload: { error } };
};

export const updateRatingsAsync = (firebase, winner, loser) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    const { winnerNewRating, loserNewRating } = calculateElo(winner, loser);
    const ratings = {
      [winner.id]: winnerNewRating,
      [loser.id]: loserNewRating,
    };

    const updateWinnerObservable = updateRating(firebase, winner.id, winnerNewRating);
    const updateLoserObservable = updateRating(firebase, loser.id, loserNewRating);
    const mergedObservable = updateWinnerObservable.merge(updateLoserObservable);

    mergedObservable.subscribe(
      data => dispatch(updateRatingSucceeded(data.id, ratings[data.id])),
      (error) => {
        dispatch(updateRatingFailed(error));
        dispatch(loadingEnded());
      },
      () => dispatch(loadingEnded()),
    );

    ReactGA.event({
      category: 'Vote',
      action: 'Voted for a dog',
    });

    return mergedObservable;
  };
};

export const subscribeToRatingsUpdates = (firebase) => {
  return (dispatch) => {
    watchRatings(firebase).subscribe(
      (diff) => {
        // normally we would put inspecting data inside a reducer, but it would be nice to be able to reuse
        // the same reducer we already have, so normalize here
        if (['change', 'add'].includes(diff.type)) {
          dispatch(updateRatingSucceeded(diff.new_val.id, diff.new_val.rating));
        }
      },
      error => dispatch(updateRatingFailed(error)),
    );
  };
};
