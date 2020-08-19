import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import listDisplaySaga from '../Features/ListDisplay/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(listDisplaySaga);
}
