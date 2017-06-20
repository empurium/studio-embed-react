/**
 * Article
 *
 * Shows a single article.
 */

import React from 'react';
import { Link } from 'react-router';

import Img from 'components/Img';
import Content from './Content';

const Article = ({ item }) => { // eslint-disable-line react/prefer-stateless-function
  const preview = { __html: item.preview };
  const content = { __html: item.content };

  return (
    <article className="publication-studio-article">
      <h1>
        <Link to={`/article/${item.slug_uri}`}>{item.title}</Link>
      </h1>

      <Content>
        <Img src={item.image_url} alt={item.title} />
      </Content>

      <Content className="article-preview" dangerouslySetInnerHTML={preview} />

      <Content className="article-content" dangerouslySetInnerHTML={content} />
    </article>
  );
};

Article.propTypes = {
  item: React.PropTypes.object.isRequired,
};

export default Article;
