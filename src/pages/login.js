import React from 'react';
import { connect } from 'dva';
import { Login } from 'ant-design-pro';

const { UserName, Password, Submit } = Login;

export default connect()((props) => {
  const onSubmit = (err,values) => {
    if (!err) {
      props.dispatch({
        type: 'global/login',
        payload: values,
      });
    }
  };

  return (
    <div style={{ maxWidth: '368px', margin: 'auto' }}>
      <Login onSubmit={onSubmit}>
        <UserName
          name="username"
          placeholder="请输入用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <Password
          name="password"
          placeholder="请输入密码"
          rules={[{ required: true, message: '请输入密码' }]}
        />
        <Submit onClick={onSubmit}>登录</Submit>
      </Login>
    </div>
  )
})
