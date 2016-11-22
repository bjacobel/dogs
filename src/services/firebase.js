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
  return firebase.ref(`/dogs/${id}`).once('value').val();
};

export const updateRating = (firebase, id, newRating) => {
  return firebase.ref(`/dogs/${id}`).update({ rating: newRating }).val();
};

export const watchRatings = (firebase) => {
  return firebase.ref('/dogs').watch('value');
};
