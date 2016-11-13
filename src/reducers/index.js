import { combineReducers } from 'redux';

import dogs from './dogs';
import loading from './loading';
import error from './error';
import ratings from './ratings';
import horizon from './horizon';

export default combineReducers({
  dogs,
  error,
  loading,
  ratings,
  horizon,
});
