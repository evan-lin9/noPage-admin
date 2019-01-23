import { Model} from 'dva';
import { delay } from 'dva/saga';

export interface IWinningColumnItem {
  prizeType: number;
  jobNumber: string;
  name: string;
  prizeName: string;
  company: boolean;
}
export interface IWinningState {
  list: IWinningColumnItem[];
}

const getList = async () => {
  await delay(500);
  const str = localStorage.getItem('memberList');
  if (str) {
    return JSON.parse(str)
  }
  return [];
};

const winningList: Model = {
  namespace: 'winningList',

  state: {
    list: [],
  },

  effects: {
    *read (_, { call, put}) {
      const res = yield call(getList);

      yield put({
        type: 'save',
        payload: { list: res },
      });
    },

    *all ({ callback }, { call }) {
      const res = yield call(getList);
      if (callback) {
        callback(res);
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    clear(state) {
      localStorage.setItem('memberList', JSON.stringify([]));
      return {
        ...state,
        list: []
      }
    }
  },
};

export default winningList;
