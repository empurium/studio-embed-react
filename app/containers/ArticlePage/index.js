import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import Article from 'components/Article';
import { loadArticle as actionLoadArticle } from './actions';
import { makeSelectSlugUri, makeSelectArticle } from './selectors';

export class ArticlePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { params, loading, error, loadArticle } = this.props;
    if (!loading && !error && params.slugUri !== false) {
      loadArticle(params.slugUri);
    }
  }

  render() {
    const { article } = this.props;
    if (!article) {
      return null;
    }

    return (
      <div>
        <Helmet
          title={article.title}
          meta={[
            { name: 'description', content: article.preview },
          ]}
        />
        <Article item={article} />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  params: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  article: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loadArticle: PropTypes.func.isRequired,
};


export function mapStateToProps(state) {
  return {
    loading: makeSelectLoading()(state),
    error: makeSelectError()(state),
    slugUri: makeSelectSlugUri()(state),
    article: makeSelectArticle()(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    loadArticle: (slugUri) => dispatch(actionLoadArticle(slugUri)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
