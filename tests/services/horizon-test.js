import {
  getAllDogs,
  getSpecificDog,
} from '../../src/services/horizon';

describe('Horizon services', () => {
  describe('getAllDogsAsync', () => {
    it('returns an rxjs observable which resolves with an array of dogs', () => {
      return getAllDogs().subscribe((dogs) => {
        expect(dogs instanceof Array).toBeTruthy();
      });
    });
  });

  describe('getSpecifigDogAsync', () => {
    it('returns an rxjs observable which resolves with a dog object', () => {
      return getSpecificDog().subscribe((dog) => {
        expect(dog instanceof Object).toBeTruthy();
      });
    });
  });
});
