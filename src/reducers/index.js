import { combineReducers } from 'redux';

import dogs from './dogs';
import loading from './loading';
import error from './error';

export default combineReducers({
  dogs,
  error,
  loading,
});
