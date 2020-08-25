import store from '../redux/store';

export type AppDispatch = typeof store.dispatch;

export type Action = {
  type: string;
  payload: any;
};
