import fetch from 'dva/fetch';
import { stringify } from 'qs';
import { readPagination } from '.';
import { baseUrl } from './config';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

async function checkStatus(response: Response, body: string = '') {
  if (response.status >= 200 && response.status < 300) {
    const { code, msg, data } = await response.json();
    if (code === '0000') {
      let res = data;
      if (data && data.list && (data.navigatepageNums || data.totalPage)) {
        res = readPagination(data, body);
      }
      return res;
    } else {
      const error = new Error(msg);
      error.name = code;
      throw error;
    }
  } else {
    const error = new Error(codeMessage[response.status] || response.statusText);
    error.name = String(response.status);
    throw error;
  }
}

interface IRequestOptions extends RequestInit {
  params?: {};
  rootUrl?: string;
}

export default async function request(api: string, options: IRequestOptions) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      Authorization: sessionStorage.token || '',
    },
  };
  const { rootUrl = baseUrl, params = {}, ...rest } = options;
  const newOptions = { ...defaultOptions, ...rest };

  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
         'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }

  const response = await fetch(`${rootUrl}${api}?${stringify(params)}`, newOptions);
  return checkStatus(response, JSON.stringify(newOptions.body));
}
