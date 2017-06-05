import React from 'react';
import { shallow } from 'enzyme';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import Article from 'components/Article';
import ArticleList from '../index';

describe('<ArticlesList />', () => {
  it('should render nothing if nothing given', () => {
    const wrapper = shallow(
      <ArticleList loading={false} error={false} articles={false} />
    );

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should render the loading indicator when its loading', () => {
    const wrapper = shallow(
      <ArticleList loading />
    );

    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(List).prop('component')).toEqual(LoadingIndicator);
  });

  it('should render a errors', () => {
    const wrapper = shallow(
      <ArticleList error />
    );

    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(List).prop('component').name).toEqual('ErrorComponent');
  });

  it('should render a list of articles with Article', () => {
    const articles = [
      { title: 'Article 1' },
      { title: 'Article 2' },
      { title: 'Article 3' },
    ];
    const wrapper = shallow(
      <ArticleList error={false} articles={articles} />
    );

    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(List).prop('component')).toEqual(Article);
    expect(wrapper.find(List).prop('items')).toEqual(articles);
  });
});
