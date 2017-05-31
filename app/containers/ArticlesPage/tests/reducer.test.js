import { fromJS } from 'immutable';
import articlesPageReducer from '../reducer';

describe('articlesPageReducer', () => {
  it('returns the initial state', () => {
    expect(articlesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
