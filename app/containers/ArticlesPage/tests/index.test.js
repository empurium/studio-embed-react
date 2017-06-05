import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { shallow } from 'enzyme';
import configureStore from 'store';

import ArticlesList from 'components/ArticlesList';
import { ArticlesPage, mapStateToProps, mapDispatchToProps } from '../index';


describe('<ArticlesPage />', () => {
  let loadArticlesSpy;

  beforeEach(() => {
    loadArticlesSpy = jest.fn();
  });

  it('should render with a Helmet', () => {
    const renderedComponent = shallow(
      <ArticlesPage loadArticles={loadArticlesSpy} />
    );

    expect(renderedComponent.contains(
      <Helmet
        title="Articles"
        meta={[
          { name: 'description', content: 'Latest Articles' },
        ]}
      />
    )).toBe(true);
  });

  it('should render with a ArticlesList and pass correct props', () => {
    const articlesListProps = {
      loading: false,
      error: false,
      articles: false,
    };
    const renderedComponent = shallow(
      <ArticlesPage {...articlesListProps} loadArticles={loadArticlesSpy} />
    );

    expect(renderedComponent.contains(
      <ArticlesList {...articlesListProps} />
    )).toBe(true);
  });

  it('should load articles by default', () => {
    shallow(
      <ArticlesPage
        articles={false}
        loadArticles={loadArticlesSpy}
      />
    );

    expect(loadArticlesSpy).toHaveBeenCalled();
  });

  it('should NOT initially load articles if loading', () => {
    shallow(
      <ArticlesPage
        loading
        articles={false}
        loadArticles={loadArticlesSpy}
      />
    );

    expect(loadArticlesSpy).not.toHaveBeenCalled();
  });

  it('should NOT initially load articles if error', () => {
    shallow(
      <ArticlesPage
        error
        articles={false}
        loadArticles={loadArticlesSpy}
      />
    );

    expect(loadArticlesSpy).not.toHaveBeenCalled();
  });

  describe('maps state/dispatch to props', () => {
    const initialState = {
      articlesPage: {
        articles: false,
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

    ['loadArticles', 'articles', 'error', 'loading'].forEach((propName) => {
      it(`${propName} prop should be defined`, () => {
        expect(props[propName]).toBeDefined();
      });
    });

    describe('loadArticles()', () => {
      let loadArticles;

      beforeEach(() => {
        loadArticles = props.loadArticles;
      });

      it('should dispatch action', () => {
        loadArticles();
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });
});
