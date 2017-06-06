/*
 *
 * ArticlePage reducers
 *
 * These are used to watch specific types of events occurring in Redux, and only
 * act upon the events that we care about. They will modify the Redux state as
 * needed based on the given event.
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: false,
  article: false,
  slugUri: false,
});

function articlePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('article', false)
        .set('slugUri', action.slugUri);
    case LOAD_ARTICLE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('article', action.article);
    case LOAD_ARTICLE_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default articlePageReducer;
