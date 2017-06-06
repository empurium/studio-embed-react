import { fromJS, Map } from 'immutable';
import {
  selectArticlePage,
  makeSelectSlugUri,
  makeSelectArticle,
} from '../selectors';


describe('selectArticlePage', () => {
  it('should select the articlePage state', () => {
    const articlePageState = fromJS({});
    const mockedState = fromJS({
      articlePage: articlePageState,
    });

    expect(selectArticlePage(mockedState)).toEqual(articlePageState);
  });
});

describe('makeSelectSlugUri', () => {
  it('should select the slug URI', () => {
    const slugUriSelector = makeSelectSlugUri();
    const slugUri = 'chocolate-bunnies-are-taking-over-592d7c520a10c';
    const mockedState = fromJS({
      articlePage: {
        slugUri,
      },
    });

    expect(slugUriSelector(mockedState)).toEqual(slugUri);
  });
});

describe('makeSelectArticle', () => {
  it('should select the article', () => {
    const articleSelector = makeSelectArticle();
    const article = { title: 'article 1' };
    const mockedState = fromJS({
      articlePage: {
        article,
      },
    });

    expect(articleSelector(mockedState)).toEqual(article);
  });

  it('should select the article after converting from a Map', () => {
    const articleSelector = makeSelectArticle();
    const article = { title: 'article 1' };
    const articleMap = new Map(article);
    const mockedState = fromJS({
      articlePage: {
        article: articleMap,
      },
    });

    expect(articleSelector(mockedState)).toEqual(article);
  });
});
