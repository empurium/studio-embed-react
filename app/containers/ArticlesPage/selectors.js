/**
 * Direct selector to the articlesPage state domain
 */

import { createSelector } from 'reselect';

const selectArticlesPage = () => (state) => state.get('articlesPage');

const makeSelectArticles = () => createSelector(
  selectArticlesPage(),
  (articlesState) => articlesState.get('articles')
);

export {
  selectArticlesPage,
  makeSelectArticles,
};
