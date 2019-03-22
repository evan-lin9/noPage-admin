import { Model } from 'dva';
import { message } from 'antd';
import { stringify } from 'qs';
import request from 'utils/request';

const initState = {
  api: '',
  list: [],
  pagination: {},
  filters: {},
  defaultFilters: {},
  detail: {},
};

interface IState {
  api: string;
  list: any[],
  pagination: {},
  filters: {},
  defaultFilters: {},
  detail: {},
};

const page: Model = {
  namespace: 'page',

  state: initState as IState,

  effects: {
    *init({ payload }, { put }) {
      let res: { api?: string } = {};
      if (typeof payload === 'string') {
        res.api = payload;
      } else {
        res = payload;
      }

      yield put({
        type: 'save',
        payload: {
          ...initState,
          ...res,
        },
      });

      yield put({
        type: 'read',
      });
    },

    *read({ payload }, { call, put, select }) {
      const { api, defaultFilters } = yield select((state: any) => state.page);
      const { pagination, filters } = payload || (yield select((state: any) => state.page));

      const res = yield call(request, `${api}/page`, {
        method: 'POST',
        params: pagination,
        body: { ...defaultFilters, ...filters },
      });

      yield put({
        type: 'save',
        payload: res,
      });
    },

    *create({ payload, callback }, { call, put, select }) {
      const { api } = yield select((state: any) => state.page);
      const res = yield call(request, api, {
        method: 'POST',
        body: payload,
      });
      yield put({
        type: 'readList',
      });
      if (callback) {
        callback(res);
      }
      message.success('创建成功');
    },

    *delete({ payload: id, callback }, { call, put, select }) {
      const { api } = yield select((state: any) => state.page);
      yield call(request, `${api}/${id}`, {
        method: 'DELETE',
      });
      yield put({
        type: 'readList',
      });
      if (callback) {
        callback();
      }
      message.success('删除成功');
    },

    *update({ payload, callback }, { call, put, select }) {
      const { api } = yield select((state: any) => state.page);
      yield call(request, api, {
        method: 'PUT',
        body: payload,
      });
      yield put({
        type: 'readList',
      });
      if (callback) {
        callback();
      }
      message.success('更新成功');
    },

    *detail({ payload }, { call, put, select }) {
      const { api } = yield select((state: any) => state.page);
      const { pagination, filters } = payload || (yield select((state: any) => state.page));
      const res = yield call(request, `${api}/page?${stringify(pagination)}`, {
        method: 'POST',
        body: filters,
      });

      yield put({
        type: 'save',
        payload: res,
      });
    },

    *close({ payload, callback }, { call, put, select }) {
      const { api } = yield select((state: any) => state.page);
      yield call(request, `${api}/close`, {
        method: 'PUT',
        params: { ...payload },
      });
      yield put({
        type: 'readList',
      });
      if (callback) {
        callback();
      }
      message.success('关闭成功');
    },

    *export({ callback }, { call, select }) {
      const { api, defaultFilters, filters } = yield select((state: any) => state.page);
      const res = yield call(request, `${api}/all`, {
        method: 'POST',
        body: { ...defaultFilters, ...filters },
      });
      if (res) {
        callback(res)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    test(state, _) {
      return {
        ...state,
      }
    }
  },
};

export default page;
