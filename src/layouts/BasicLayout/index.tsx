import React, { ReactNode } from 'react';
import { connect, SubscriptionAPI } from 'dva';
import Redirect from 'umi/redirect';
import classNames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
import { GlobalHeader, GlobalFooter, SliderMenu } from 'components';
import { IGlobalState } from 'models/global';
import { IModelMap } from 'utils/interface';
import avatar from '../../assets/avatar.png';

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

interface IProps extends SubscriptionAPI, IGlobalState {
  location: Location;
  children?: ReactNode;
}

export default connect(({ global }: IModelMap) => global)((props: IProps) => {
  const {
    userInfo: { name },
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
      // onChangePassword();
    }
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
