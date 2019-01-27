import { Model} from 'dva';
import router from 'umi/router';
import { getInfo } from '../../mock/login';

interface IUserInfo {
  name: string;
  avatar: string;
}

export interface IMenuData {
  icon?: string;
  path: string;
  name: string;
  children: IMenuData[];
  parentMenuId?: number;
  sortId?: number;
  menuId?: number;
  url?: string;
}

export interface IGlobalState {
  login: boolean;
  collapsed: boolean;
  userInfo: IUserInfo;
  authority: {[key: string]: {}};
  menu: IMenuData[];
}
const loginInfo = sessionStorage.loginInfo ? JSON.parse(sessionStorage.loginInfo) : {};
const global: Model = {
  namespace: 'global',

  state: {
    login: false,
    collapsed: false,
    userInfo: {},
    menu: [],
    authority: {},
    ...loginInfo,
  },

  effects: {
    *login({ payload }, { put }) {
      const { username, password } = payload;

      if (username === 'admin' && password === '123456') {
        const { menu, userInfo } = getInfo;
        const info = {
          authority: {
            '/': {}, // 首页权限
            ...getInfo.authority,
          },
          login: true,
          userInfo,
          menu,
        };
        sessionStorage.loginInfo = JSON.stringify(info);
        yield put({
          type: 'changeLoginStatus',
          payload: info,
        });
        router.replace('/');
      }
    },

    *logout(_, { put }) {
      sessionStorage.clear();
      yield put({
        type: 'changeLoginStatus',
        payload: {
          login: false,
        },
      });
      router.replace('/login');
    },

    // *changePassword({ payload, callback }, { call }) {
    //   yield call(changePassword, payload);
    //   if (callback) callback();
    // },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },

    changeLoginStatus(state, { payload }) {
      const { login, userInfo = {}, menu = [], authority = {} } = payload;

      return {
        ...state,
        login,
        userInfo,
        menu,
        authority,
      };
    },
  },
};

export default global
