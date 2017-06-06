import { fromJS } from 'immutable';

import articlePageReducer from '../reducer';
import {
  loadArticle,
  articleLoaded,
  articleLoadingError,
} from '../actions';

describe('articlePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: true,
      error: false,
      article: false,
      slugUri: false,
    });
  });

  it('returns the initial state', () => {
    const expectedState = state;

    expect(articlePageReducer(undefined, {})).toEqual(expectedState);
  });

  it('should handle the loadArticle action correctly', () => {
    const slugUri = 'chocolate-bunnies-are-taking-over-592d7c520a10c';
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .set('article', false)
      .set('slugUri', slugUri);

    expect(articlePageReducer(state, loadArticle(slugUri))).toEqual(expectedResult);
  });

  it('should handle the articleLoaded action correctly', () => {
    const article = { title: 'Article 1' };
    const expectedResult = state
      .set('article', article)
      .set('loading', false)
      .set('error', false);

    expect(articlePageReducer(state, articleLoaded(article))).toEqual(expectedResult);
  });

  it('should handle the articleLoadingError action correctly', () => {
    const error = 'Some error';
    const expectedResult = state
      .set('error', error)
      .set('loading', false);

    expect(articlePageReducer(state, articleLoadingError(error))).toEqual(expectedResult);
  });
});
