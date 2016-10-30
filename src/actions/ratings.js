import calculateElo from '../services/elo';
import { updateRating } from '../services/horizon';
import {
  loadingStarted,
  loadingEnded,
} from './loading';

export const UPDATE_RATING_FAILED = 'UPDATE_RATING_FAILED';
export const UPDATE_RATING_SUCCEEDED = 'UPDATE_RATING_SUCCEEDED';

export const updateRatingSucceeded = (dogId, rating) => {
  return { type: UPDATE_RATING_SUCCEEDED, payload: { dogId, rating } };
};

export const updateRatingFailed = (error) => {
  return { type: UPDATE_RATING_FAILED, payload: { error } };
};

export const updateRatingsAsync = (winner, loser) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    const { winnerNewRating, loserNewRating } = calculateElo(winner, loser);

    const updateWinnerObservable = updateRating(winner.id, winnerNewRating);
    const updateLoserObservable = updateRating(loser.id, loserNewRating);
    const mergedObservable = updateWinnerObservable.merge(updateLoserObservable);

    updateWinnerObservable.subscribe(
      () => dispatch(updateRatingSucceeded(winner.id, winnerNewRating)),
      error => dispatch(updateRatingFailed(error)),
    );

    updateLoserObservable.subscribe(
      () => dispatch(updateRatingSucceeded(loser.id, loserNewRating)),
      error => dispatch(updateRatingFailed(error)),
    );

    mergedObservable.subscribe(
      undefined,
      () => dispatch(loadingEnded()),
      () => dispatch(loadingEnded()),
    );

    return mergedObservable;
  };
};
