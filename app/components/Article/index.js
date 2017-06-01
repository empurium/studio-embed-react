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
    const preview = { __html: item.preview };
    const content = { __html: item.content };

    // Render the content into a list item
    return (
      <div>
        <h1>{item.title}</h1>
        <Img src={item.image_url} alt={item.title} />
        <div dangerouslySetInnerHTML={preview}></div>
        <div dangerouslySetInnerHTML={content}></div>
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
