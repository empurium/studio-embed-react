/**
 * Article
 *
 * Shows a single article.
 */

import React from 'react';

import Img from 'components/Img';

const Article = ({ item }) => { // eslint-disable-line react/prefer-stateless-function
  const preview = { __html: item.preview };
  const content = { __html: item.content };

  return (
    <div>
      <h1>{item.title}</h1>
      <Img src={item.image_url} alt={item.title} />
      <div className="preview" dangerouslySetInnerHTML={preview}></div>
      <div className="content" dangerouslySetInnerHTML={content}></div>
    </div>
  );
};

Article.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default Article;
