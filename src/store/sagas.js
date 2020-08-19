import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import listDisplaySaga from '../Features/ListDisplay/saga';
import metricsSaga from '../Features/DisplayChart/saga';
import lastKnownMeasurement from '../Features/IdivItem/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(listDisplaySaga);
  yield spawn(metricsSaga);
  yield spawn(lastKnownMeasurement);
}
