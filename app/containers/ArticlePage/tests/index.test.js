import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { shallow } from 'enzyme';
import configureStore from 'store';

import Article from 'components/Article';
import { ArticlePage, mapStateToProps, mapDispatchToProps } from '../index';


describe('<ArticlePage />', () => {
  let loadArticleSpy;
  const article = {
    title: 'Article 1',
    preview: 'Preview Text',
    slug_uri: 'irrelevant',
  };

  beforeEach(() => {
    loadArticleSpy = jest.fn();
  });

  it('should render with a Helmet', () => {
    const renderedComponent = shallow(
      <ArticlePage
        params={{ slugUri: 'irrelevant' }}
        article={article}
        loadArticle={loadArticleSpy}
      />
    );

    expect(renderedComponent.contains(
      <Helmet
        title={article.title}
        meta={[
          { name: 'description', content: article.preview },
        ]}
      />
    )).toBe(true);
  });

  it('should know when an article has changed', () => {
    const articlePage = new ArticlePage();
    const articles = [
      { title: 'Article 1', slug_uri: 'article-1' },
      { title: 'Article 2', slug_uri: 'article-2' },
    ];

    // article changed
    expect(articlePage.articleChanged(articles[0], false)).toBeTruthy();
    expect(articlePage.articleChanged(articles[0], articles[1].slug_uri)).toBeTruthy();

    // article did not change
    expect(articlePage.articleChanged(articles[0], articles[0].slug_uri)).toBeFalsy();
  });

  it('should render with a Article and pass correct props', () => {
    const renderedComponent = shallow(
      <ArticlePage
        params={{ slugUri: 'irrelevant' }}
        article={article}
        loadArticle={loadArticleSpy}
      />
    );

    expect(renderedComponent.contains(
      <Article item={article} />
    )).toBe(true);
  });

  it('should render null with no article present', () => {
    const renderedComponent = shallow(
      <ArticlePage
        params={{ slugUri: 'irrelevant' }}
        article={false}
        loadArticle={loadArticleSpy}
      />
    );

    expect(renderedComponent.isEmptyRender()).toBe(true);
  });

  it('should load article by default', () => {
    shallow(
      <ArticlePage
        params={{ slugUri: 'irrelevant' }}
        article={false}
        loadArticle={loadArticleSpy}
      />
    );

    expect(loadArticleSpy).toHaveBeenCalled();
  });

  it('should NOT initially load article if loading', () => {
    shallow(
      <ArticlePage
        loading
        params={{ slugUri: 'irrelevant' }}
        article={false}
        loadArticle={loadArticleSpy}
      />
    );

    expect(loadArticleSpy).not.toHaveBeenCalled();
  });

  it('should NOT initially load article if error', () => {
    shallow(
      <ArticlePage
        error
        params={{ slugUri: 'irrelevant' }}
        article={false}
        loadArticle={loadArticleSpy}
      />
    );

    expect(loadArticleSpy).not.toHaveBeenCalled();
  });

  describe('maps state/dispatch to props', () => {
    const initialState = {
      articlePage: {
        article: false,
      },
    };
    const store = configureStore(initialState, browserHistory);
    const state = store.getState();

    let props;
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn();

      props = {
        ...mapStateToProps(state),
        ...mapDispatchToProps(dispatchSpy),
      };
    });

    ['loadArticle', 'article', 'error', 'loading'].forEach((propName) => {
      it(`${propName} prop should be defined`, () => {
        expect(props[propName]).toBeDefined();
      });
    });

    describe('loadArticle()', () => {
      let loadArticle;

      beforeEach(() => {
        loadArticle = props.loadArticle;
      });

      it('should dispatch action', () => {
        loadArticle();
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });
});
