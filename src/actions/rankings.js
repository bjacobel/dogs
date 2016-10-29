import calculateElo from '../services/elo';

export const UPDATE_RATING_FAILED = 'UPDATE_RATING_FAILED';
export const UPDATE_RATING_SUCCEEDED = 'UPDATE_RATING_SUCCEEDED';

export const updateRatingSucceeded = (dogs) => {
  return { type: UPDATE_RATING_SUCCEEDED, payload: { dogs } };
};

export const updateRatingFailed = (error) => {
  return { type: UPDATE_RATING_FAILED, payload: { error } };
};

export const updateRatingAsync = (winner, loser) => {
  return (dispatch) => {

  };
};
