import calculateElo from '../services/elo';
import { updateRating } from '../services/horizon';
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

export const updateRatingsAsync = (winner, loser) => {
  return (dispatch) => {
    dispatch(loadingStarted());

    const { winnerNewRating, loserNewRating } = calculateElo(winner, loser);
    const ratings = {
      [winner.id]: winnerNewRating,
      [loser.id]: loserNewRating,
    };

    const updateWinnerObservable = updateRating(winner.id, winnerNewRating);
    const updateLoserObservable = updateRating(loser.id, loserNewRating);
    const mergedObservable = updateWinnerObservable.merge(updateLoserObservable);

    mergedObservable.subscribe(
      (data) => {
        dispatch(updateRatingSucceeded(data.id, ratings[data.id]));
      },
      (error) => {
        dispatch(updateRatingFailed(error));
        dispatch(loadingEnded());
      },
      () => dispatch(loadingEnded()),
    );

    return mergedObservable;
  };
};
