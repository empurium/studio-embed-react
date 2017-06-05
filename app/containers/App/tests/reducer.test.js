import { fromJS } from 'immutable';

import {
  loadArticles,
  articlesLoaded,
  articlesLoadingError,
} from 'containers/ArticlesPage/actions';
import appReducer from '../reducer';

describe('appReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = fromJS({
      loading: false,
      error: false,
    });
  });

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  it('should return original state without matching action', () => {
    expect(appReducer(undefined, { type: 'NO_ACTION' })).toEqual(initialState);
  });

  // Loading bar
  it('loading bar should show when loading something', () => {
    expect(appReducer(undefined, loadArticles()).get('loading')).toEqual(true);
  });

  it('loading bar should hide when loading was successful', () => {
    expect(appReducer(undefined, articlesLoaded([])).get('loading')).toEqual(false);
  });

  it('loading bar should hide when loading returned error', () => {
    const error = 'Some error';
    expect(appReducer(undefined, articlesLoadingError(error)).get('error')).toEqual(error);
  });

  // Global error
  it('global error should be reset when starting new task(s)', () => {
    expect(appReducer(undefined, loadArticles()).get('error')).toEqual(false);
  });

  it('global error should be reset when loading task(s) were successful', () => {
    expect(appReducer(undefined, articlesLoaded([])).get('error')).toEqual(false);
  });

  it('global error should be set when task(s) returned an error', () => {
    const error = 'Some error';
    expect(appReducer(undefined, articlesLoadingError(error)).get('error')).toEqual(error);
  });
});
