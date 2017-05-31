import {
  loadArticles,
  articlesLoaded,
  articlesLoadingError,
} from '../actions';
import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_ERROR,
} from '../constants';


describe('ArticlesPage actions', () => {
  describe('Load Articles Action', () => {
    it('has a type of LOAD_ARTICLES', () => {
      const expected = {
        type: LOAD_ARTICLES,
      };
      expect(loadArticles()).toEqual(expected);
    });
  });

  describe('Load Articles Success Action', () => {
    it('has a type of LOAD_ARTICLES_SUCCESS', () => {
      const expected = {
        type: LOAD_ARTICLES_SUCCESS,
      };
      expect(articlesLoaded()).toEqual(expected);
    });
  });

  describe('Load Articles Error Action', () => {
    it('has a type of LOAD_ARTICLES_ERROR', () => {
      const expected = {
        type: LOAD_ARTICLES_ERROR,
      };
      expect(articlesLoadingError()).toEqual(expected);
    });
  });
});
