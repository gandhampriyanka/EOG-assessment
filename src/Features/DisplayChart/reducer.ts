import { createSlice, PayloadAction } from 'redux-starter-kit';

// export type metricsdata = {
//   metric: string;
//   {
//     metric: string;
//     at: number;
//     value: number;
//     unit: string;
//   }

// };
// interface IMyObject {
//   label: number;
//   value: number;
// }
export type measure = {
  measurements: any[];
  metric: string;
  __typename: string;
};

export type Metrics = {
  getMultipleMeasurements: [];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metricName: '',
  after: '',
  before: '',
  getMultipleMeasurements: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<Metrics>) => {
      console.log(action.payload);
      // console.log(action.payload.getMultipleMeasurements.measurements);
      // const getMultipleMeasurements: any[] = action.payload.getMultipleMeasurements;
      // console.log(getMultipleMeasurements);

      state.getMultipleMeasurements = action.payload.getMultipleMeasurements;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
