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
      const articles = [
        { title: 'Article 1' },
        { title: 'Article 2' },
      ];
      const expected = {
        type: LOAD_ARTICLES_SUCCESS,
        articles,
      };
      expect(articlesLoaded(articles)).toEqual(expected);
    });
  });

  describe('Load Articles Error Action', () => {
    it('has a type of LOAD_ARTICLES_ERROR', () => {
      const error = 'Some error';
      const expected = {
        type: LOAD_ARTICLES_ERROR,
        error,
      };
      expect(articlesLoadingError(error)).toEqual(expected);
    });
  });
});
