import React from 'react';
import withRouter from 'umi/withRouter';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import BasicLayout from './BasicLayout'
import LoginLayout from './LoginLayout';

export default withRouter((props: any) =>
  <LocaleProvider locale={zhCN}>
    <>
      {props.location.pathname !== '/login' ? (
        <BasicLayout {...props}>{props.children}</BasicLayout>
      ) : (
        <LoginLayout>{props.children}</LoginLayout>
      )}
    </>
  </LocaleProvider>
);

