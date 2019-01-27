import React from 'react';
import { connect, SubscriptionAPI } from 'dva';
import { Button } from 'antd';
import { Cascader, Form, FormCore, FormItem, Input } from 'utils/nopage';

interface IProps extends SubscriptionAPI {
  loading: boolean;
}

const options = [
  {
    value: '1',
    label: '北京',
    children: [
      {
        value: '11',
        label: '朝阳区',
        children: [
          {
            value: '111',
            label: '左家庄街道',
          },
          {
            value: '112',
            label: '麦子店街道',
          }
        ],
      },
      {
        value: '12',
        label: '海淀区',
        children: [
          {
            value: '121',
            label: '三环以内',
          },
          {
            value: '122',
            label: '上庄镇',
          }
        ],
      },
      {
        value: '13',
        label: '西城区',
        children: [
          {
            value: '131',
            label: '白纸坊街道',
          },
          {
            value: '132',
            label: '椿树街道',
          }
        ],
      }
    ],
  },
  {
  value: '2',
  label: '四川',
  children: [
    {
      value: '21',
      label: '成都市',
      children: [
        {
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }
      ],
    }
  ],
}];

const core = new FormCore({
  autoValidate: true,
  validateConfig: {
    consignee: [
      { required: true, type: 'string', message: '收货人' },
      { max: 8, message: '不得超过 8 个字'},
    ],
    area: [{ required: true, message: '选择区域' }],
    detailAddress: [{ required: true, message: '详细地址' }],
    consigneeMobile: [
      { required: true, message: '手机号'},
      {
        pattern: /^1[0-9]{10}$/,
        message: '手机号输入有误'
      }
    ]
  }
});

export default connect()((props: IProps) => {
  const onSubmit = () => {
    core.validate((err:any) => {
      if (!err) {
        props.dispatch({
          type: 'step/submitAddressForm',
          payload: core.getValues() ,
        });
      }
    });
  };

  return (
    <Form core={core} layout={{ label: 8, control: 16 }}>
      <FormItem label='收货人' name='consignee' required>
        <Input placeholder='请输入收货人' />
      </FormItem>
      <FormItem label='所在地区' name='area' required>
        <Cascader
          style={{ width: 400 }}
          allowClear
          options={options}
          placeholder="请选择地区"
        />
      </FormItem>
      <FormItem label='详细地址' name='detailAddress' defaultMinWidth={false} required>
        <Input placeholder='详细地址' style={{ width: 400 }} />
      </FormItem>
      <FormItem label='手机号' name='consigneeMobile' required>
        <Input placeholder='手机号' />
      </FormItem>
      <FormItem label='地址别名' name='addressAlias'>
        <Input placeholder='地址别名' />
      </FormItem>
      <FormItem>
        <Button htmlType='button' type='primary' onClick={onSubmit}>添加</Button>
      </FormItem>
    </Form>
  );
})
