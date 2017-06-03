/*
 *
 * ArticlesPage selectors
 *
 * These are used as selectors to pull the data any given Component needs directly
 * out of the Redux state to display it.
 *
 * Note that after SSR is complete, the browser will pick up and run these selectors,
 * so they need to intelligently transform immutable the data back to JS.
 *
 */

import { createSelector } from 'reselect';
import { List } from 'immutable';

const selectArticlesPage = (state) => state.get('articlesPage');

const makeSelectArticles = () => createSelector(
  selectArticlesPage,
  (articlesState) => {
    const articles = articlesState.get('articles');
    if (List.isList(articles)) {
      return articles.toJS();
    }

    return articles;
  }
);

export {
  selectArticlesPage,
  makeSelectArticles,
};
