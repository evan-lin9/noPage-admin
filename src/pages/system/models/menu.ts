import { Model } from 'dva';
import getMenuList from '../services';

const menu: Model = {
  namespace: 'menu',

  state: {
    menuList: [],
  },

  effects: {
    *read(_, { call, put}) {
      const menuList = yield call(getMenuList);
      yield put({
        type: 'save',
        payload: {
          menuList
        }
      })
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  }
};

export default menu;
