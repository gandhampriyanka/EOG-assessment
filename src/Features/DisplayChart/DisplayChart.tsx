// import * as React from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery } from 'urql';
// import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Chip from '../../components/Chip';
import { IState } from '../../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const client = createClient({
//   url: 'https://react.eogresources.com/graphql',
// });

const query = `
query($input: [MeasurementQuery]!) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
`;

export interface myobj {
  [key: string]: any;
}
export interface selcVal {
  selectedValue?: myobj[];
}

interface simpleInt {
  label?: string | null;
  value?: any | null;
}

type simpleType = simpleInt[];

const chartdata = (data: any) => {
  //mounika code
  if (data.length > 0) {
    let temp = [];
    let dlen = data[0].measurements.length;
    for (let i = 0; i < dlen; i++) {
      let obj: myobj = {};
      for (let j = 0; j < data.length; j++) {
        // not all equip has same measurement length so
        if (data[j].measurements[i]) {
          obj[data[j].measurements[i].metric] = data[j].measurements[i].value;
          obj['at'] = new Date(data[j].measurements[i].at).toLocaleTimeString().replace(/:\d+ /, ' ');
        }
      }
      temp.push(obj);
    }
    return temp;
  } else {
    return [];
  }
};

//////
const getMetrics = (state: IState) => {
  const getMultipleMeasurements = state.metrics.getMultipleMeasurements;
  return {
    getMultipleMeasurements,
  };
};

const DisplayChart: React.FC<any> = (sel: selcVal) => {
  // let vall: string;
  const dispatch = useDispatch();
  const getMultipleMeasurements = useSelector(getMetrics);
  let graphList = chartdata(getMultipleMeasurements.getMultipleMeasurements);
  let allMetircs = getMultipleMeasurements.getMultipleMeasurements;

  let num = allMetircs.map((eachMetrics: myobj) => {
    let areas = eachMetrics.metric;
    return areas;
  });
  let colorsObj: myobj = {
    watertemp: '##008000',
    flareTemp: '#00FFFF',
    oilTemp: '#00FFFF',
  };
  let area = num.map((metrics: string) => {
    return <Line type="monotone" key={metrics} stroke={colorsObj[metrics]} dataKey={metrics} activeDot={{ r: 2 }} />;
  });

  //

  // let valuesSelected: myobj = sel;
  let current_time = new Date().getTime();
  let input: myobj[] = [];
  if (sel.selectedValue) {
    sel.selectedValue.forEach(item => {
      let iobj: myobj = {};
      iobj.metricName = item.value;
      iobj.after = 1597796500000;
      iobj.before = 1597796560899;
      input.push(iobj);
    });
  }

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
    pollInterval: 3000,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricsDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={400}
          data={graphList}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="at" />
          <YAxis />
          <Tooltip />
          {area}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DisplayChart;
