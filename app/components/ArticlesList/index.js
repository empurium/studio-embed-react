import React, { PropTypes } from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import Article from 'components/Article';

const ArticlesList = ({ loading, error = false, articles }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (articles !== false) {
    return <List items={articles} component={Article} />;
  }

  return null;
};

ArticlesList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  articles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

export default ArticlesList;
