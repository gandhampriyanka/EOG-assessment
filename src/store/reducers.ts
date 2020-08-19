import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as listDisplayReducer } from '../Features/ListDisplay/reducer';
import { reducer as metricsReducer } from '../Features/DisplayChart/reducer';
import { reducer as lastKnownMeasurementReducer } from '../Features/IdivItem/reducer';

export default {
  weather: weatherReducer,
  listDisplay: listDisplayReducer,
  metrics: metricsReducer,
  lastKnownMeasurement: lastKnownMeasurementReducer,
};
