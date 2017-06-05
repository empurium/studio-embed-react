import React from 'react';
import { shallow } from 'enzyme';

import Img from 'components/Img';
import Article from '../index';


describe('<Article />', () => {
  let wrapper;
  const article = {
    title: 'Article 1',
    image_url: 'thumbnail.png',
    preview: 'Preview',
    content: 'Content',
  };

  beforeEach(() => {
    wrapper = shallow(
      <Article item={article} />
    );
  });

  it('should render', () => {
    expect(wrapper.find(Article)).toBeTruthy();
  });

  it('should render the title', () => {
    expect(wrapper.contains(<h1>{article.title}</h1>)).toBeTruthy();
  });

  it('should render the image', () => {
    expect(wrapper.find(Img)).toBeTruthy();
    expect(wrapper.find(Img).prop('src')).toEqual(article.image_url);
  });

  it('should render the preview with HTML');

  it('should render the content with HTML');
});
