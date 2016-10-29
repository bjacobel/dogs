import {
  ELO_INITIAL,
  ELO_K,
} from '../constants';

const getNewRating = (dog, competitor, actualScore) => {
  // get the dog's expected rating
  const competitorRating = competitor.rating || ELO_INITIAL;
  const selfRating = dog.rating || ELO_INITIAL;
  const expectedScore = 1 / (1 + (10 ** ((competitorRating - selfRating) / 400)));

  return selfRating + (ELO_K * (actualScore - expectedScore));
};

export default (winner, loser) => {
  const winnerNewRating = getNewRating(winner, loser, 1);
  const loserNewRating = getNewRating(loser, winner, 0);

  return { winnerNewRating, loserNewRating };
};
