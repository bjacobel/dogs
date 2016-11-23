import ReactGA from 'react-ga';

import calculateElo from '../services/elo';
import {
  updateRating,
  watchRatings,
} from '../services/firebase';
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
    const updateWinnerPromise = updateRating(firebase, winner.id, winnerNewRating);
    const updateLoserPromise = updateRating(firebase, loser.id, loserNewRating);

    return Promise.all([updateWinnerPromise, updateLoserPromise])
      .then(() => {
        // Don't need to dispatch an update success here because our listener will get it automatically
        dispatch(loadingEnded());
        ReactGA.event({
          category: 'User actions',
          action: 'Vote cast',
        });
      })
      .catch((error) => {
        dispatch(updateRatingFailed(error));
        dispatch(loadingEnded());
      });
  };
};

export const subscribeToRatingsUpdates = (firebase) => {
  return (dispatch) => {
    const success = newVal => dispatch(updateRatingSucceeded(newVal.val().id, newVal.val().rating));
    const fail = error => dispatch(updateRatingFailed(error));

    return watchRatings(firebase, success, fail);
  };
};
