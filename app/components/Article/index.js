/**
 * Article
 *
 * Shows a single article.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Img from 'components/Img';
import { makeSelectArticles } from 'containers/ArticlesPage/selectors';

export class Article extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;

    // Render the content into a list item
    return (
      <div>
        <h1>{item.title}</h1>
        <Img src={item.image_url} alt={item.title} />
        <p>{item.preview}</p>
      </div>
    );
  }
}

Article.propTypes = {
  item: React.PropTypes.object,
};

export default connect(createStructuredSelector({
  articles: makeSelectArticles(),
}))(Article);
