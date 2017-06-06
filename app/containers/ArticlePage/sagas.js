/*
 *
 * ArticlePage sagas
 *
 * These watch for specific events to come from Redux (takeLatest), fetch the
 * data necessary for the given event, and then finally return it via an action
 * where any number of Components could be listening for it.
 *
 */

import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { LOAD_ARTICLE } from './constants';
import { articleLoaded, articleLoadingError } from './actions';

/**
 * Gets the article
 */
export function* getArticle(action) {
  const requestURL = `https://publication.720global.com/articles?slug_uri=${action.slugUri}`;

  try {
    const article = yield call(request, requestURL);
    yield put(articleLoaded(article.data));
  } catch (err) {
    yield put(articleLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* articleData() {
  // Watches for LOAD_ARTICLE actions and calls getArticle when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ARTICLE, getArticle);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  articleData,
];
