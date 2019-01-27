import React from 'react';
import { Button } from 'antd';
import { Form, FormCore, FormItem, Input } from 'utils/nopage';
import { connect } from 'dva';
import { IModelMap } from 'utils/interface';

const core = new FormCore({});

export default connect(({ step }: IModelMap) => step)((props: any) => {
  const onSubmit = () => {
    core.validate((err:any) => {
      if (!err) {
        props.dispatch({
          type: 'step/submitRegisteredForm',
          payload: core.getValues() ,
        });
      }
    });
  };

  return (
    <Form core={core} layout={{ label: 8, control: 16 }}>
      <FormItem label='姓名' name='name' required>
        <Input type='password' placeholder='姓名' />
      </FormItem>
      <FormItem label='卡号' name='cardNumber' required>
        <Input placeholder='请输入银卡卡号' />
      </FormItem>
      <FormItem label='预留手机' name='mobile' required>
        <Input type='password' placeholder='请输入银行卡预留手机号' />
      </FormItem>
      <FormItem label='（可选）手机号' name='mobile'>
        <Input/>
      </FormItem>
      <FormItem label='（可选）邮箱' name='email'>
        <Input/>
      </FormItem>
      <FormItem>
        <Button htmlType='button' type='primary' onClick={onSubmit} loading={props.loading}>绑定</Button>
      </FormItem>
    </Form>
  )
})
