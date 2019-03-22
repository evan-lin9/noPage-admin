import React, { useEffect } from 'react';
import { connect, SubscriptionAPI } from 'dva';
import NoPage from 'components/NoPage';
import { FormItem, Input } from 'utils/nopage';
import { Card } from 'antd';

export default connect()((props: SubscriptionAPI) => {
  const { dispatch } = props;

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Card>
      <NoPage columns={columns} filterForm={
        <>
        <FormItem label="姓名" name="name">
          <Input />
        </FormItem>
        <FormItem label="姓名" name="xsa">
          <Input />
        </FormItem>
        <FormItem label="姓名" name="cds">
          <Input />
        </FormItem>
        <FormItem label="姓名" name="qw">
          <Input />
        </FormItem>
        <FormItem label="姓名" name="csd">
          <Input />
        </FormItem>
        <FormItem label="姓名" name="vfd">
          <Input />
        </FormItem>
      </>
      }
    />
    </Card>
  );
});
