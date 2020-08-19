// import * as React from 'react';
// interface Label {
//   label: {};
//   name: string;
//   selectedValue?: string;
// }
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';
import { createClient, useQuery } from 'urql';
// import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Chip from '../../components/Chip';
import { IState } from '../../store';
// import Grid from '@material-ui/core/Grid'
// import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export interface myobj {
  [key: string]: any;
}
export interface selcVal {
  selectedValue?: myobj[];
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.spacing(0),
    },
    value: {
      fontSize: '22px',
      padding: theme.spacing(2),
      flex: 'auto',
      textAlign: 'right',
      background: '#4b5669',
      color: '#fff',
    },
    text: {
      padding: theme.spacing(2),
      fontSize: '15px',
      flex: '1',
      maxWidth: '60%',
      minWidth: '60%',
      textAlign: 'left',
      justifyContent: 'end',
      textTransform: 'capitalize',
      fontWeight: 'bold',
      color: '#273142',
      display: 'flex',
      alignItems: 'center',
    },
  }),
);
export interface myArray {
  myArray: any[];
}
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
query($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
        metric
        at
        value
        unit
      }
}
`;

const getLastKnownMeasurement = (state: IState) => {
  const lastKnownMeasurement = state.lastKnownMeasurement.getLastKnownMeasurement;

  return {
    lastKnownMeasurement,
  };
};

let metricdata: myobj;
const IdivItem: React.FC<any> = (selectedValue: myobj) => {
  const classes = useStyles();
  let [metricValue, onmetricSelected] = useState<myobj>({});

  const dispatch = useDispatch();

  const [result] = useQuery({
    query,
    variables: {
      metricName: selectedValue.selectedValue,
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.lastKnownMeasurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    metricdata = data.getLastKnownMeasurement;

    onmetricSelected(data.getLastKnownMeasurement);
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  return (
    <div className={classes.root}>
      <span className={classes.text}>{metricValue ? metricValue.metric : null}</span>
      <strong className={classes.value}>{metricValue ? metricValue.value : null}</strong>
    </div>
  );
};

export default IdivItem;
