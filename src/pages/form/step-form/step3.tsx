import React from 'react';
import { connect } from 'dva';
import { Button, notification } from 'antd';
import { Form, FormCore, FormItem, Input, InputNumber } from 'utils/nopage';
import { CountDown } from 'components';
import { IModelMap } from 'utils/interface';

const core = new FormCore({
  autoValidate: true,
  validateConfig: {
    name: [
      { required: true, type: 'string', message: '姓名' },
      { max: 8, message: '不得超过 8 个字'},
    ],
    cardNumber: [{ required: true, message: '输入银行卡号' }],
    mobile: [
      { required: true, message: '手机号'},
      {
        pattern: /^1[0-9]{10}$/,
        message: '手机号输入有误'
      }
    ],
    verifyCode: [{ required: true, message: '请输入验证码' }],
  }
});

export default connect(({ step }: IModelMap) => step)((props: any) => {
  const onSubmit = () => {
    core.validate((err:any) => {
      if (!err) {
        props.dispatch({
          type: 'step/bindBankcard',
          payload: core.getValues() ,
        });
      }
    });
  };

  const onClickSending = async (): Promise<boolean> => {
    const hasError = await core.validateItem('mobile');
    const flag = !hasError;
    if (flag) {
      await setTimeout(() => {
        notification.open({
          duration: 2,
          message: '短信验证码',
          description: 1234,
        });
      }, 300)
    }
    return flag;
  };

  return (
    <Form core={core} layout={{ label: 8, control: 16 }}>
      <FormItem label='姓名' name='name' required>
        <Input placeholder='姓名' />
      </FormItem>
      <FormItem label='卡号' name='cardNumber' required>
        <Input placeholder='输入银卡卡号' />
      </FormItem>
      <FormItem
        label='预留手机'
        name='mobile'
        suffix={<CountDown duration={60} onClickSending={onClickSending} />}
        required
      >
        <Input placeholder='输入银行卡预留手机号' />
      </FormItem>
      <FormItem label='验证码' name='verifyCode' required>
        <InputNumber placeholder='输入四位数验证码' min={1000} max={9999} precision={0} />
      </FormItem>
      <FormItem>
        <Button htmlType='button' type='primary' onClick={onSubmit} loading={props.loading}>绑定</Button>
      </FormItem>
    </Form>
  )
})
