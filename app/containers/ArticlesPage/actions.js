/*
 *
 * ArticlesPage actions
 *
 */

import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_ERROR,
  LOAD_ARTICLES_SUCCESS,
} from './constants';

/**
 * Load the articles, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTICLES
 */
export function loadArticles() {
  return {
    type: LOAD_ARTICLES,
  };
}

/**
 * Dispatched when the articles are loaded by the request saga
 *
 * @param  {array} articles The articles data
 *
 * @return {object}      An action object with a type of LOAD_ARTICLES_SUCCESS passing the articles
 */
export function articlesLoaded(articles) {
  return {
    type: LOAD_ARTICLES_SUCCESS,
    articles,
  };
}

/**
 * Dispatched when loading the articles fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ARTICLES_ERROR passing the error
 */
export function articlesLoadingError(error) {
  return {
    type: LOAD_ARTICLES_ERROR,
    error,
  };
}
