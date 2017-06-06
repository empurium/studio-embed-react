/*
 *
 * ArticlePage selectors
 *
 * These are used as selectors to pull the data any given Component needs directly
 * out of the Redux state to display it.
 *
 * Note that after SSR is complete, the browser will pick up and run these selectors,
 * so they need to intelligently transform immutable the data back to JS.
 *
 */

import { createSelector } from 'reselect';
import { Map } from 'immutable';

const selectArticlePage = (state) => state.get('articlePage');

const makeSelectSlugUri = () => createSelector(
  selectArticlePage,
  (articleState) => articleState.get('slugUri'),
);

const makeSelectArticle = () => createSelector(
  selectArticlePage,
  (articleState) => {
    const article = articleState.get('article');
    if (Map.isMap(article)) {
      return article.toJS();
    }

    return article;
  }
);

export {
  selectArticlePage,
  makeSelectSlugUri,
  makeSelectArticle,
};
