import React from 'react';
import { connect } from 'dva';
import { PageHeader } from 'components';
import { Steps, Icon } from 'antd';
import { IModelMap } from 'utils/interface';
import Step1 from './step1';
import styles from './index.less'

const { Step } = Steps;

export default connect(({ step }: IModelMap) => step)((props: IModelMap['step']) => {
  const { currentStep } = props;

  return (
    <PageHeader
      title='分步表单'
    >
      <Steps current={currentStep}>
        <Step title="注册" icon={<Icon type="user" />} />
        <Step title="登陆" icon={<Icon type="solution" />} />
        <Step title="付款" icon={<Icon type="loading" />} />
        <Step title="完成" icon={<Icon type="smile-o" />} />
      </Steps>
      <div className={styles['step-content']}>
        <Step1 />
      </div>
    </PageHeader>
  )
})
