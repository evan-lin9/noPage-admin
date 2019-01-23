import React from 'react';
import Form, { FormItem } from 'noform';
import { Input } from 'nowrapper/lib/antd';
// import {
//   Checkbox,
//   DatePicker,
//   Input,
//   InputNumber,
//   Select,
// } from 'noform-components';


export default () => (
  <Form layout={{ label: 8, control: 16 }}>
    <FormItem label="test" name="test"><Input /></FormItem>
  </Form>
)

