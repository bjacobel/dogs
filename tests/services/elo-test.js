import calculateElo from '../../src/services/elo';

describe('elo rating service', () => {
  it('ranks up the winner and down the loser when both have the same rating', () => {
    expect(calculateElo({ rating: 1000 }, { rating: 1000 })).toEqual({
      winnerNewRating: 1016,
      loserNewRating: 984,
    });
  });

  it('gets new ranks when a highly rated dog loses to a lowly rated one', () => {
    expect(calculateElo({ rating: 1000 }, { rating: 2000 })).toEqual({
      winnerNewRating: 1031.8991261061358,
      loserNewRating: 1968.1008738938642,
    });
  });

  it('gets new ranks when a lowly rated dog loses to a highly rated one', () => {
    expect(calculateElo({ rating: 2000 }, { rating: 1000 })).toEqual({
      winnerNewRating: 2000.1008738938642,
      loserNewRating: 999.8991261061357,
    });
  });

  it('gets new ranks when dogs are passed without ratings', () => {
    expect(calculateElo({}, {})).toEqual({
      winnerNewRating: 1016,
      loserNewRating: 984,
    });
  });
});
