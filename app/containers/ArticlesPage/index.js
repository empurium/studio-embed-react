import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import ArticlesList from 'components/ArticlesList';
import { loadArticles as actionLoadArticles } from './actions';
import { makeSelectArticles } from './selectors';

export class ArticlesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { loading, error, loadArticles, articles } = this.props;
    if (!loading && !error && articles === false) {
      loadArticles();
    }
  }

  render() {
    const { loading, error, articles } = this.props;
    const articlesListProps = {
      loading,
      error,
      articles,
    };

    return (
      <div>
        <Helmet
          title="Articles"
          meta={[
            { name: 'description', content: 'Latest Articles' },
          ]}
        />
        <ArticlesList {...articlesListProps} />
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  articles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loadArticles: PropTypes.func.isRequired,
};


export function mapStateToProps(state) {
  return {
    loading: makeSelectLoading()(state),
    error: makeSelectError()(state),
    articles: makeSelectArticles()(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadArticles: () => dispatch(actionLoadArticles()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
