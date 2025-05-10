// rootSaga.ts
import { all } from 'redux-saga/effects';
import {  watchProduct } from './product/productSaga';
import { watchLoginUser } from './auth/authSaga';

export default function* rootSaga() {
  yield all([
    watchProduct(),
    watchLoginUser()
    // Add other sagas here if any
  ]);
}
