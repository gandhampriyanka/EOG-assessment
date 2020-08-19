import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
    pollInterval: 1300,
    requestPolicy: 'network-only',
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
