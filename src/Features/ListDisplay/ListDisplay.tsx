import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../../store';
import Select from 'react-select';
import { DisplayChart } from '../DisplayChart/DisplayChart';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;

interface optInt {
  value: string;
  label: string;
}

interface IMyObject {
  label: number;
  value: number;
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

interface Itate {
  selectedValue: IMyObject[];
}
export type lType = {
  getMetrics: any;
};
export interface myobj {
  [key: string]: any;
}
export interface Listarr {
  [index: number]: { label: string; value: string };
}

const getListDisplay = (state: IState) => {
  return state.listDisplay;
};

export default () => {
  return (
    <Provider value={client}>
      <Listt />
    </Provider>
  );
};
const Listt: React.FC = () => {
  const classes = useStyles();
  let [selectedValue, onSelected] = useState<simpleInt[]>([]);

  const dispatch = useDispatch();
  const listData: myobj = useSelector(getListDisplay);
  const opt: lType = listData.getMetrics;
  const optArr: string[] = opt.getMetrics;
  let optionsList: optInt[] = [];
  // let listt: optInt[] = [];
  if (optArr) {
    optArr.forEach((item: any) => {
      optionsList.push({ label: item, value: item });
    });
  }

  let itemss;

  let ss;

  if (selectedValue) {
    ss = selectedValue.map((item: myobj) => {
      return item.value;
    });
  }

  type MyOption = { label: string; value: number };
  type MyOptionType = { label: string; value: number };
  interface simpleInt {
    label?: string | null;
    value?: string | null;
  }

  type simpleType = simpleInt[];

  // type OnChange = (value: ValueType<MyOptionType>, actionMeta: ActionMeta<MyOptionType>) => void;
  const selectt = (val?: any) => {
    if (val) {
      let valuee: simpleInt[] = val;
      let arrayselc: simpleType = [];
      onSelected(valuee);
    } else {
      onSelected([]);
    }
  };

  type OptionType = { label: string; value: number };
  let listofEquipments = <Select options={optionsList} isMulti onChange={selectt} />;

  const [result] = useQuery({
    query,
    // pollInterval: 3000,
    // requestPolicy: 'network-only',
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.equipmentsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const getMetrics = data;
    dispatch(actions.equipmentsListDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item justify="center" alignItems="center" xs={12}>
            <Paper className={classes.paper}>
              <Grid item xs={5}>
                {listofEquipments}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {selectedValue.length > 0 ? (
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <DisplayChart selectedValue={selectedValue}></DisplayChart>
            </Paper>
          </Grid>
        ) : null}
      </Container>
    </div>
  );
};
