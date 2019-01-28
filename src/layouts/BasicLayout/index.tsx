import React, { ReactNode } from 'react';
import { connect, SubscriptionAPI } from 'dva';
import Redirect from 'umi/redirect';
import classNames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import { Layout, Row, Col, notification } from 'antd';
import { Form, FormCore, FormItem, Input, DialogForm } from 'utils/nopage';
import { GlobalHeader, GlobalFooter, SliderMenu, CountDown } from 'components';
import { IGlobalState } from 'models/global';
import { IModelMap } from 'utils/interface';
import avatar from 'assets/avatar.png';

interface IProps extends SubscriptionAPI, IGlobalState {
  location: Location;
  children?: ReactNode;
}

const { Content, Header, Footer } = Layout;
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};
const core = new FormCore({
  validateConfig: {
    verifyCode: [{ required: true, message: '请输入验证码' }],
    newPassword: [{ required: true, message: '请输入新密码' }],
  },
});

export default connect(({ global }: IModelMap) => global)((props: IProps) => {
  const {
    userInfo: { name, mobile, countryCode = 86 },
    collapsed,
    location,
    menu,
    login,
  } = props;
  const currentUser = {
    name,
    avatar,
  };

  const handleMenuCollapse = (collapsed: boolean) => {
    props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  const handleMenuClick = ({ key }: {key: string}) => {
    if (key === 'logout') {
      props.dispatch({
        type: 'global/logout',
      });
    } else if (key === 'changePassword') {
      onChangePassword();
    }
  };

  const onChangePassword = () => {
    const onOk = (values: any, hide: () => void) => {
      core.validate((errors: any) => {
        if (!errors) {
          props.dispatch({
            type: 'global/changePassword',
            payload: values,
            callback: () => {
              hide();
              props.dispatch({
                type: 'global/logout',
              });
            },
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
            description: 666666,
          });
        }, 300)
      }
      return flag;
    };

    core.setValues({
      mobile,
      countryCode,
      verifyCode: '',
      newPassword: '',
    });

    DialogForm.show({
      title: '修改密码',
      width: 600,
      onOk,
      content: (
        <Form core={core}>
          <Row style={{ marginTop: '12px', marginBottom: '12px' }}>
            <Col span={5}>
              <FormItem name="countryCode" label="区号" status="disabled" defaultMinWidth={false}>
                <Input style={{ width: 50 }} />
              </FormItem>
            </Col>
            <Col span={9}>
              <FormItem
                name="mobile"
                label="手机号"
                status="disabled"
                defaultMinWidth={false}
              >
                <Input style={{ width: 120 }} />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                <CountDown
                  duration={60}
                  onClickSending={onClickSending} />
                </FormItem>
            </Col>
          </Row>
          <FormItem name="verifyCode" label="验证码">
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem name="newLecturerParssword" label="新密码">
            <Input placeholder="请输入" />
          </FormItem>
        </Form>
      ),
    });
  };

  const getPageTitle = (pathname: string) => {
    console.log(pathname);
    // 根据 pathname 改变 tittle
    // to do
    return 'noPage-admin'
  };

  const layout = (
    <Layout>
      <SliderMenu
        menu={menu}
        collapsed={collapsed}
        location={location}
        onCollapse={handleMenuCollapse}
      />
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Header style={{ padding: 0 }}>
          <GlobalHeader
            currentUser={currentUser}
            collapsed={collapsed}
            onCollapse={handleMenuCollapse}
            onMenuClick={handleMenuClick}
          />
        </Header>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          {props.children}
        </Content>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter />
        </Footer>
      </Layout>
    </Layout>
  );

  return login ? (
    <DocumentTitle title={getPageTitle(location.pathname)}>
      <ContainerQuery query={query}>
        {params => <div className={classNames(params)}>{layout}</div>}
      </ContainerQuery>
    </DocumentTitle>
  ) : (
    <Redirect to="/login" />
  );
})
