import request from 'utils/request';

export default async function getMenuList () {
  return request(`/menu`, {})
}
