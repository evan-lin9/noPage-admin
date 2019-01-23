import { Model} from 'dva';
import { delay } from 'dva/saga';

export interface IColumnItem {
  jobNumber: number;
  name: string;
  company: string;
  isJoinLottery: boolean;
}
export interface IBackState {
  list: IColumnItem[];
}

const getList = async () => {
  await delay(500);
  const str = localStorage.getItem('memberList');
  if (str) {
    return JSON.parse(str)
  }
  return [];
};

const back: Model = {
  namespace: 'back',

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

    saveList(state, { payload }) {
      const { list } = payload;
      localStorage.setItem('memberList', JSON.stringify(list));
      return {
        ...state,
        list,
      }
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

export default back;
