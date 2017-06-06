/*
 *
 * ArticlePage actions
 *
 * These are used both when dispatching an action into Redux, and for subscribing
 * to Redux state changes so that the Components can update accordingly.
 *
 */

import {
  LOAD_ARTICLE,
  LOAD_ARTICLE_ERROR,
  LOAD_ARTICLE_SUCCESS,
} from './constants';

/**
 * Load the article, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTICLE
 */
export function loadArticle(slugUri) {
  return {
    type: LOAD_ARTICLE,
    slugUri,
  };
}

/**
 * Dispatched when the article are loaded by the request saga
 *
 * @param  {array} article The article data
 *
 * @return {object}      An action object with a type of LOAD_ARTICLE_SUCCESS passing the article
 */
export function articleLoaded(article) {
  return {
    type: LOAD_ARTICLE_SUCCESS,
    article,
  };
}

/**
 * Dispatched when loading the article fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ARTICLE_ERROR passing the error
 */
export function articleLoadingError(error) {
  return {
    type: LOAD_ARTICLE_ERROR,
    error,
  };
}
