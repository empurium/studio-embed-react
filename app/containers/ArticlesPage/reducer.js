/*
 *
 * ArticlesPage reducers
 *
 * These are used to watch specific types of events occurring in Redux, and only
 * act upon the events that we care about. They will modify the Redux state as
 * needed based on the given event.
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_ERROR,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: false,
  articles: false,
});

function articlesPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('articles', false);
    case LOAD_ARTICLES_SUCCESS:
      return state
        .set('articles', action.articles)
        .set('loading', false);
    case LOAD_ARTICLES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default articlesPageReducer;
