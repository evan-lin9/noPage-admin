import React from 'react';
import { PageHeader } from 'components';
import { Button } from 'antd';
import {
  Form,
  FormCore,
  FormItem,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Radio,
} from 'utils/nopage';

const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const { Option } = Select;

const core = new FormCore({

});

export default () => (
  <PageHeader
    title='基础表单'
  >
    <Form core={core} layout={{ label: 8, control: 16 }}>
      <FormItem label="标题" name="title" required>
        <Input placeholder='请输入标题，我是必填的喔' />
      </FormItem>
      <FormItem label="目录" name="menu" defaultMinWidth={false}>
        <Input
          placeholder='可以设置 defaultMinWidth={false} 改变默认长度喔'
          style={{ width: 500 }}
        />
      </FormItem>
      <FormItem label='权重（选填）' name='weight' defaultMinWidth={false} suffix='%'>
        <InputNumber
          style={{ width: 100 }}
          min={0}
          max={100}
        />
      </FormItem>
      <FormItem label="日期" name="date">
        <DatePicker />
      </FormItem>
      <FormItem label="起止日期" name="rangeDate">
        <RangePicker />
      </FormItem>
      <FormItem label="详细描述" name="desc">
      <TextArea
        placeholder='我可以不填'
        autosize={{ minRows: 4, maxRows: 6 }}
        style={{ width: 500 }}
      />
      </FormItem>
      <FormItem name="" label="请求方式" required>
        <Select
          placeholder="请选择"
          style={{ width: 200 }}
        >
          <Option value='GET'>GET</Option>
          <Option value='POST'>POST</Option>
          <Option value='PUT'>PUT</Option>
          <Option value='DELETE'>DELETE</Option>
        </Select>
      </FormItem>
      <FormItem name='status' label='是否显示' value={0}>
        <RadioGroup options={[{ label: '显示', value: 1 },{ label: '不显示', value: 0 }]} />
      </FormItem>
      <FormItem name='fruit' label='水果'>
        <CheckboxGroup options={[{ label: 'Apple', value: 'Apple' }, { label: 'Pear', value: 'Pear' }, { label: 'Orange', value: 'Orange' }]} />
      </FormItem>
      <FormItem style={{ marginTop: 32 }}>
      <span>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button style={{ marginLeft: 8 }}>
          取消
        </Button>
      </span>
      </FormItem>
    </Form>
  </PageHeader>
)

