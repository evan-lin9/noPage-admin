import { Model} from 'dva';
import { delay } from 'dva/saga';
import { message } from 'antd';

export interface IRegisteredForm {
  username: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  dateBirth: any;
  nickname?: string;
  email?: string;
}

export interface IAddressForm {
  consignee: string;
  area: string[];
  detailAddress: string;
  consigneeMobile: string;
  addressAlias?: string
}

export interface IBankcardForm {
  name: string;
  cardNumber: string;
  mobile: string;
  verifyCode: number;
}

export interface IStepState {
  currentStep: number;
  registeredForm: IRegisteredForm;
  addressForm: IAddressForm;
  bankcardInfo: IBankcardForm;
}

const finishSubmitForm = async (time: number) => {
  await delay(time);
};

const step: Model = {
  namespace: 'step',

  state: {
    currentStep: 0,
    registeredForm: {},
    addressForm: {},
    bankcardInfo: {},
  },

  effects: {
    *submitRegisteredForm({ payload }, { call, put }) {
      yield call(finishSubmitForm, 800);
      yield put({
        type: 'saveStep1',
        payload
      });
      message.success('注册成功');
    },

    *submitAddressForm({ payload }, { call, put }) {
      yield call(finishSubmitForm, 600);
      yield put({
        type: 'saveStep2',
        payload
      });
      message.success('添加成功');
    },

    *bindBankcard({ payload }, { call, put }) {
      yield call(finishSubmitForm, 600);
      yield put({
        type: 'saveStep3',
        payload
      });
      message.success('绑定成功');
    },
  },

  reducers: {
    saveStep1(state, { payload }) {
      return {
        ...state,
        currentStep: 1,
        registeredForm: {
          ...state.registeredForm,
          ...payload,
        },
      };
    },

    saveStep2(state, { payload }) {
      return {
        ...state,
        currentStep: 2,
        addressForm: {
          ...state.addressForm,
          ...payload,
        },
      };
    },

    saveStep3(state, { payload }) {
      return {
        ...state,
        addressForm: {
          ...state.addressForm,
          ...payload,
        },
      };
    },
  },
};

export default step;
