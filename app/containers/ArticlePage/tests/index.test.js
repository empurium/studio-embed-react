import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { shallow } from 'enzyme';
import configureStore from 'store';

import Article from 'components/Article';
import { ArticlePage, mapStateToProps, mapDispatchToProps } from '../index';


describe('<ArticlePage />', () => {
  let loadArticleSpy;

  beforeEach(() => {
    loadArticleSpy = jest.fn();
  });

  it('should render with a Helmet', () => {
    const renderedComponent = shallow(
      <ArticlePage loadArticle={loadArticleSpy} />
    );

    expect(renderedComponent.contains(
      <Helmet
        title="Article"
        meta={[
          { name: 'description', content: 'Latest Article' },
        ]}
      />
    )).toBe(true);
  });

  it('should render with a Article and pass correct props', () => {
    const articleListProps = {
      loading: false,
      error: false,
      article: false,
    };
    const renderedComponent = shallow(
      <ArticlePage {...articleListProps} loadArticle={loadArticleSpy} />
    );

    expect(renderedComponent.contains(
      <Article {...articleListProps} />
    )).toBe(true);
  });

  it('should load article by default', () => {
    shallow(
      <ArticlePage
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
