import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as listDisplayReducer } from '../Features/ListDisplay/reducer';

export default {
  weather: weatherReducer,
  listDisplay: listDisplayReducer,
};
