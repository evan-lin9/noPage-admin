import { Model} from 'dva';
import { delay } from 'dva/saga';
import { message } from 'antd';

export interface IRegisteredForm {
  username: string;
  password: string;
  confirmPassword: string;
  mobile?: string;
  email?: string;
}

export interface IStepState {
  currentStep: number;
  registeredForm: IRegisteredForm;
  name: string;
  company: string;
  isJoinLottery: boolean;
}

const finishSubmitForm = async (time: number) => {
  await delay(time);
};

const step: Model = {
  namespace: 'step',

  state: {
    currentStep: 0,
    registeredForm: {},
  },

  effects: {
    *submitRegisteredForm({ payload }, { call, put }) {
      yield call(finishSubmitForm, 800);
      console.log(payload);
      yield put({
        type: 'save',
        payload
      });
      message.success('注册成功');
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        currentStep: 1,
        registeredForm: {
          ...state.registeredForm,
          ...payload,
        },
      };
    },
  },
};

export default step;
