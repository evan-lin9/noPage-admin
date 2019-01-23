import { IGlobalState } from 'models/global'

export interface IPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface IModelMap {
  loading: {
    effects: {[key: string]: boolean};
    global: boolean;
    models: {[key: string]: boolean};
  };
  global: IGlobalState;
  page: any;
}
