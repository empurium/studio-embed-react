/**
 * Article
 *
 * Shows a single article.
 */

import React from 'react';
import { Link } from 'react-router';

import Img from 'components/Img';

const Article = ({ item }) => { // eslint-disable-line react/prefer-stateless-function
  const preview = { __html: item.preview };
  const content = { __html: item.content };

  return (
    <div className="publication-studio-article">
      <h1>
        <Link to={`/article/${item.slug_uri}`}>{item.title}</Link>
      </h1>
      <Img src={item.image_url} alt={item.title} />
      <div className="preview" dangerouslySetInnerHTML={preview} />
      <div className="content" dangerouslySetInnerHTML={content} />
    </div>
  );
};

Article.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default Article;
