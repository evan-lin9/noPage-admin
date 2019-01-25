import React from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import { Form, FormCore, FormItem, Input } from 'utils/nopage';

const core = new FormCore({
  values: {
    username: 'admin',
    password: '123456',
  },
  validateConfig: {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
  }
});

export default connect()((props) => {
  const onSubmit = () => {
    core.validate(err => {
      if (!err) {
        props.dispatch({
          type: 'global/login',
          payload: core.getValues() ,
        });
      }
    });
  };

  return (
    <div style={{ maxWidth: '368px', margin: 'auto' }}>
      <Form core={core}>
        <FormItem name='username' defaultMinWidth={false}>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='请输入用户名'
            style={{ width: 360, lineHeight: '40px', height: 40 }}
          />
        </FormItem>
        <FormItem name='password' defaultMinWidth={false}>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='请输入密码'
            style={{ width: 360, lineHeight: '40px', height: 40 }}
          />
        </FormItem>
      </Form>
      <Button
        size='large'
        type="primary"
        onClick={onSubmit}
        style={{ width: 362, marginTop: 20 }}
      >
        登录
      </Button>
    </div>
  )
})
