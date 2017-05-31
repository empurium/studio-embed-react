/*
 *
 * ArticlesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import ArticlesList from 'components/ArticlesList';

import { loadArticles } from './actions';
import { makeSelectArticles } from './selectors';

export class ArticlesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadArticles();
  }

  render() {
    const { loading, error, articles } = this.props;
    const articlesListProps = {
      loading,
      error,
      articles,
    };

    return (
      <ArticlesList {...articlesListProps} />
    );
  }
}

ArticlesPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  articles: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
    React.PropTypes.any, // TODO - why is an object being passed?
  ]),
  loadArticles: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  articles: makeSelectArticles(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadArticles: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadArticles());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
