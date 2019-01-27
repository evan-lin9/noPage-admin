import React, { ReactNode } from 'react';
import { Card } from 'antd';

interface IProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default (props: IProps) => {
  return (
    <Card title={props.title} bordered={false}>
      {props.children}
    </Card>
  )
}
