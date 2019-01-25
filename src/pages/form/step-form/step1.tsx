import React from 'react';
import { Button } from 'antd';
import { Form, FormCore, FormItem, Input } from 'utils/nopage';
import { connect, SubscriptionAPI } from 'dva';
import { IModelMap } from 'utils/interface';


interface IProps extends SubscriptionAPI {
  loading: boolean;
}

const core = new FormCore({
  autoValidate: true,
  validateConfig: {
    username: [
      { required: true, type: 'string', message: '请输入账号' },
      {
        pattern: /^[a-zA-Z].{7,15}$/,
        message: '请输入字母开头、长度 8 到 16 位的密码组合',
      },
    ],
    password: [
      { required: true, type: 'string', message: '请输入密码' },
      { min: 8, message: '密码不得少于 8 个字符' },
      { max: 16, message: '密码不得大于 16 个字符' },
    ],
    confirmPassword: [{
      validator(rule: any, value: string, callback: (arr: string[]) => void ) {
        if (value === core.getValues('password')) {
          callback([]);
        } else {
          callback(['密码不相等']);
        }
      }
    }]
    // confirmPassword: (values: IModelMap['step']['registeredForm'], context: any): any => {
    //   const { password, confirmPassword } = values;
    //   if (password === confirmPassword) {
    //     return {type: 'string', required: false };
    //   }
    // }
  }
});

export default connect(({ step, loading }: IModelMap) => ({
  ...step,
  loading: loading.effects['step/submitRegisteredForm']
}))((props: IProps) => {
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
      <FormItem label='账号' name='username' required>
        <Input placeholder='请输入账号' />
      </FormItem>
      <FormItem label='密码' name='password' required>
        <Input placeholder='请输入密码' />
      </FormItem>
      <FormItem label='确认密码' name='confirmPassword' required>
        <Input placeholder='请确认密码' />
      </FormItem>
      <FormItem label='（可选）手机号' name='mobile'>
        <Input/>
      </FormItem>
      <FormItem label='（可选）邮箱' name='email'>
        <Input/>
      </FormItem>
      <FormItem>
        <Button htmlType='button' type='primary' onClick={onSubmit} loading={props.loading}>提交</Button>
      </FormItem>
    </Form>
  )
})
