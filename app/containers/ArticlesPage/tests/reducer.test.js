import { fromJS } from 'immutable';

import articlesPageReducer from '../reducer';
import {
  loadArticles,
  articlesLoaded,
  articlesLoadingError,
} from '../actions';

describe('articlesPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: true,
      error: false,
      articles: false,
    });
  });

  it('returns the initial state', () => {
    const expectedState = state;
    expect(articlesPageReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle the loadArticles action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .set('articles', false);

    expect(articlesPageReducer(state, loadArticles())).toEqual(expectedResult);
  });

  it('should handle the articlesLoaded action correctly', () => {
    const articles = [
      { title: 'Article 1' },
      { title: 'Article 2' },
    ];
    const expectedResult = state
      .set('articles', articles)
      .set('loading', false)
      .set('error', false);

    expect(articlesPageReducer(state, articlesLoaded(articles))).toEqual(expectedResult);
  });

  it('should handle the articlesLoadingError action correctly', () => {
    const error = 'Some error';
    const expectedResult = state
      .set('error', error)
      .set('loading', false);

    expect(articlesPageReducer(state, articlesLoadingError(error))).toEqual(expectedResult);
  });
});
