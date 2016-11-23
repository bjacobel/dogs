import Firebase from 'firebase/app';
import 'firebase/database';
import { FIREBASE_AUTH } from '../constants';

export const createClient = () => {
  return Firebase.initializeApp(FIREBASE_AUTH).database();
};

export const getAllDogs = (firebase) => {
  return firebase.ref('/dogs').once('value');
};

export const getSpecificDog = (firebase, id) => {
  return firebase.ref(`/dogs/${id}`).once('value');
};

export const updateRating = (firebase, id, newRating) => {
  return firebase.ref(`/dogs/${id}`).update({ rating: newRating });
};

export const watchRatings = (firebase, success, fail) => {
  return firebase.ref('/dogs').on('child_changed', success, fail);
};
