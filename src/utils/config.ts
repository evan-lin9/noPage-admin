export const baseUrl = localStorage.getItem('url') || 'http://localhost:8001';

export const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export const monthFormat = 'YYYYMM';

export const defaultPagination = {
  current: 1,
  pageSize: 10,
};
