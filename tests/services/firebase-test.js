import Firebase from 'firebase';

import {
  getAllDogs,
  getSpecificDog,
} from '../../src/services/firebase';

describe('Firebase services', () => {
  describe('getAllDogsAsync', () => {
    it('returns an rxjs observable which resolves with an array of dogs', () => {
      return getAllDogs((new Firebase())('collection')).subscribe((dogs) => {
        expect(dogs instanceof Array).toBeTruthy();
      });
    });
  });

  describe('getSpecifigDogAsync', () => {
    it('returns an rxjs observable which resolves with a dog object', () => {
      return getSpecificDog((new Firebase())('collection')).subscribe((dog) => {
        expect(dog instanceof Object).toBeTruthy();
      });
    });
  });
});
