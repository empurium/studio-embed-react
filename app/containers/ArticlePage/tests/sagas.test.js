import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_ARTICLE } from '../constants';
import { articleLoaded, articleLoadingError } from '../actions';
import { getArticle, articleData } from '../sagas';


/* eslint-disable redux-saga/yield-effects */
describe('getArticle Saga', () => {
  let getArticleGenerator;

  beforeEach(() => {
    getArticleGenerator = getArticle();

    const callDescriptor = getArticleGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the articleLoaded action if it requests the data successfully', () => {
    const article = [
      { title: 'Article 1' },
      { title: 'Article 2' },
    ];
    const response = {
      data: article,
    };
    const putDescriptor = getArticleGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(articleLoaded(article)));
  });

  it('should call the articleLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getArticleGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(articleLoadingError(response)));
  });
});

describe('articleData Saga', () => {
  let generator;
  let taskMock;

  beforeEach(() => {
    generator = articleData();
    taskMock = createMockTask();
  });

  it('should start task to watch for LOAD_ARTICLE action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_ARTICLE, getArticle));
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
