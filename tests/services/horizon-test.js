import {
  getAllDogs,
  getSpecificDog,
} from '../../src/services/horizon';

describe('Horizon services', () => {
  describe('getAllDogsAsync', () => {
    it('returns a Promise which resolves with an array of dogs', () => {
      return getAllDogs().then((dogs) => {
        expect(dogs instanceof Array).toBeTruthy();
      });
    });
  });

  describe('getSpecifigDogAsync', () => {
    it('returns a Promise which resolves with a dog object', () => {
      return getSpecificDog().then((dog) => {
        expect(dog instanceof Object).toBeTruthy();
      });
    });
  });
});
