/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { combineReducers } from 'redux-immutable';

import {
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES,
  LOAD_ARTICLES_ERROR,
} from 'containers/ArticlesPage/constants';

function loading(state = false, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return true;
    case LOAD_ARTICLES_SUCCESS:
      return false;
    case LOAD_ARTICLES_ERROR:
      return false;
    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return false;
    case LOAD_ARTICLES_SUCCESS:
      return false;
    case LOAD_ARTICLES_ERROR:
      return action.error;
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  error,
});
