import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ARTICLES } from '../constants';
import { articlesLoaded, articlesLoadingError } from '../actions';
import { getArticles, articlesData } from '../sagas';


/* eslint-disable redux-saga/yield-effects */
describe('getArticles Saga', () => {
  let getArticlesGenerator;

  beforeEach(() => {
    getArticlesGenerator = getArticles();

    const callDescriptor = getArticlesGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the articlesLoaded action if it requests the data successfully', () => {
    const articles = [
      { title: 'Article 1' },
      { title: 'Article 2' },
    ];
    const response = {
      data: articles,
    };
    const putDescriptor = getArticlesGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(articlesLoaded(articles)));
  });

  it('should call the articlesLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getArticlesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(articlesLoadingError(response)));
  });
});

describe('articlesData Saga', () => {
  let generator;
  let taskMock;

  beforeEach(() => {
    generator = articlesData();
    taskMock = createMockTask();
  });

  it('should start task to watch for LOAD_ARTICLES action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ARTICLES, getArticles));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    generator.next();
    const takeDescriptor = generator.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel after LOCATION_CHANGE action', () => {
    generator.next();
    generator.next(taskMock);
    const cancelDescriptor = generator.next();
    expect(cancelDescriptor.value).toEqual(cancel(taskMock));
  });
});
