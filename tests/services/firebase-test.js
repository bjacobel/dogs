import {
  getAllDogs,
  getSpecificDog,
} from '../../src/services/firebase';

describe('Firebase services', () => {
  let firebase;

  beforeEach(() => {
    firebase = {
      ref: jest.fn(() => ({
        once: jest.fn(() => Promise.resolve({})),
      })),
    };
  });

  describe('getAllDogsAsync', () => {
    it('returns a promise which resolves with an array of dogs', () => {
      return getAllDogs(firebase).then((dogs) => {
        expect(dogs instanceof Object).toBeTruthy();
      });
    });
  });

  describe('getSpecifigDogAsync', () => {
    it('returns a promise which resolves with a dog object', () => {
      return getSpecificDog(firebase).then((dog) => {
        expect(dog instanceof Object).toBeTruthy();
      });
    });
  });
});
