import React, { Fragment, ReactNode } from 'react';
import { connect } from 'dva';
import { PageHeader } from 'components';
import { Steps, Icon } from 'antd';
import { IModelMap } from 'utils/interface';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import styles from './index.less';

const { Step } = Steps;

export default connect(({ step }: IModelMap) => step)((props: IModelMap['step']) => {
  const { currentStep } = props;

  const getCurrentCom = (): ReactNode => {
    switch (currentStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return <Fragment />;
    }
  };

  return (
    <PageHeader
      title='分步表单'
    >
      <Steps current={currentStep}>
        <Step title="注册" icon={<Icon type="user" />} />
        <Step title="添加收货地址" icon={<Icon type="environment" />} />
        <Step title="绑定银行卡" icon={<Icon type="solution" />} />
        <Step title="付款" icon={<Icon type="loading" />} />
      </Steps>
      <div className={styles['step-content']}>
        {getCurrentCom()}
      </div>
    </PageHeader>
  );
});
