import Firebase from 'firebase';
import rxFirebase from 'rx-firebase';
import { Observable } from 'rxjs';
import { FIREBASE_AUTH } from '../constants';

rxFirebase.extend(Firebase, Observable);

export const createClient = () => {

};

export const getAllDogs = (firebase) => {
  return firebase.fetch();
};

export const getSpecificDog = (firebase, id) => {
  return firebase.find({ id }).fetch();
};

export const updateRating = (firebase, id, newRating) => {
  return firebase.update({ id, rating: newRating });
};

export const watchRatings = (firebase) => {
  return firebase.watch({ rawChanges: true });
};
