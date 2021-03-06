/*
 *
 * ArticlesPage sagas
 *
 * These watch for specific events to come from Redux (takeLatest), fetch the
 * data necessary for the given event, and then finally return it via an action
 * where any number of Components could be listening for it.
 *
 */

import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { LOAD_ARTICLES } from './constants';
import { articlesLoaded, articlesLoadingError } from './actions';

/**
 * Gets the articles
 */
export function* getArticles() {
  const requestURL = 'https://publication.publication.studio/articles?page=1&limit=5&tiered=false';

  try {
    const articles = yield call(request, requestURL);
    yield put(articlesLoaded(articles.data));
  } catch (err) {
    yield put(articlesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* articlesData() {
  // Watches for LOAD_ARTICLES actions and calls getArticles when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ARTICLES, getArticles);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [articlesData];
