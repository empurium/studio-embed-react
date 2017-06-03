import { fromJS, List } from 'immutable';
import {
  selectArticlesPage,
  makeSelectArticles,
} from '../selectors';


describe('selectArticlesPage', () => {
  it('should select the articlesPage state', () => {
    const articlesPageState = fromJS({});
    const mockedState = fromJS({
      articlesPage: articlesPageState,
    });

    expect(selectArticlesPage(mockedState)).toEqual(articlesPageState);
  });
});

describe('makeSelectArticles', () => {
  it('should select the articles', () => {
    const articlesSelector = makeSelectArticles();
    const articles = [
      { title: 'article 1' },
      { title: 'article 2' },
    ];
    const mockedState = fromJS({
      articlesPage: {
        articles,
      },
    });

    expect(articlesSelector(mockedState)).toEqual(articles);
  });

  it('should select the articles after converting from a List', () => {
    const articlesSelector = makeSelectArticles();
    const articles = [
      { title: 'article 1' },
      { title: 'article 2' },
    ];
    const articlesList = new List(articles);
    const mockedState = fromJS({
      articlesPage: {
        articles: articlesList,
      },
    });

    expect(articlesSelector(mockedState)).toEqual(articles);
  });
});
