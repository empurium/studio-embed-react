import {
  loadArticle,
  articleLoaded,
  articleLoadingError,
} from '../actions';
import {
  LOAD_ARTICLE,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_ERROR,
} from '../constants';


describe('ArticlePage actions', () => {
  describe('Load Article Action', () => {
    it('has a type of LOAD_ARTICLE', () => {
      const slugUri = 'chocolate-bunnies-are-taking-over-592d7c520a10c';
      const expected = {
        type: LOAD_ARTICLE,
        slugUri,
      };

      expect(loadArticle(slugUri)).toEqual(expected);
    });
  });

  describe('Load Article Success Action', () => {
    it('has a type of LOAD_ARTICLE_SUCCESS', () => {
      const article = { title: 'Article 1' };
      const expected = {
        type: LOAD_ARTICLE_SUCCESS,
        article,
      };

      expect(articleLoaded(article)).toEqual(expected);
    });
  });

  describe('Load Article Error Action', () => {
    it('has a type of LOAD_ARTICLE_ERROR', () => {
      const error = 'Some error';
      const expected = {
        type: LOAD_ARTICLE_ERROR,
        error,
      };

      expect(articleLoadingError(error)).toEqual(expected);
    });
  });
});
