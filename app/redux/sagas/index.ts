import { all } from 'redux-saga/effects';
import watchFetchCrimeData from './CrimeDataSaga';

export default function* rootSaga() {
  yield all([watchFetchCrimeData()]);
}
