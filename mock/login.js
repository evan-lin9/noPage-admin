const menu = [
  {
    id: 1,
    icon: 'form',
    name: '表单',
    path: '/form',
    children:[
      {
        id: 11,
        name: '基本表单',
        path: '/form/base-form',
      },
      {
        id: 12,
        name: '分步表单',
        path: '/form/step-form',
      },
      {
        id: 13,
        name: '高级表单',
        path: '/form/advanced-form'
      }
    ]
  },
  {
    id: 2,
    icon: 'table',
    name: '列表',
    path: '/list',
    children: [
      {
        id: 21,
        name: '基本列表',
        path: '/list/base-list',
      },
    ]
  }
];

export const authority = {
  '/form/base-form': {},
  '/list/base-list': {},
};

export const getInfo = {
  userInfo: {
    name: '管里员',
    mobile: '13981234567',
    email: '123456@qq.com',
    countryCode: 86,
  },
  authority,
  menu,
};
