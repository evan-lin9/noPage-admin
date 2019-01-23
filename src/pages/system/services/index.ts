import request from 'utils/request';

export default async function getMenuList () {
  return request(`/menu`, {})
}

export async function loginApi(params: {}) {
  return request(`/jiayi-order/lecturer/cooperation/lecturerCooperationLogin`, {
    method: 'GET',
    params,
  });
}

export async function changePassword(body: any) {
  return request(`/jiayi-order/lecturer/cooperation/updateLecturerCooperationParssword`, {
    method: 'POST',
    body,
  });
}
