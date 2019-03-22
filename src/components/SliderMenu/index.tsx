import React, { ReactNode, useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { IMenuData } from 'models/global';
import { ClickParam } from 'antd/lib/menu';
import styles from './index.less';
import logo from 'assets/logo.svg';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
interface ISliderMenuProps {
  collapsed: boolean;
  menu: IMenuData[];
  onCollapse: (bool: boolean) => void;
  location: Location;
}

type IIcon = string | ReactNode;
const getIcon = (icon: IIcon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

/**
 * /list/search = > ['list','/list/search']
 */
const urlToList = (pathname: string) => {
  const url = pathname || '/';
  const urlList = url.split('/').filter(i => i);
  return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
};

export default (props: ISliderMenuProps) => {
  const { menu, collapsed, onCollapse, location: { pathname = '/'} } = props;
  const [openKeys, setOpenKeys] = useState(['/']);
  const [selectedKeys, setSelectedKeys] = useState(['/']);

  useEffect(() => {
    const temp: string[] = urlToList(pathname);
    setSelectedKeys(temp);
    setOpenKeys(temp);
  },[]);

  const getNavMenuItems = (menus: IMenuData[]) => {
    if (!menus) {
      return [];
    }
    return menus
      .map(item => getSubMenuOrItem(item))
      .filter(item => item);
  };

  const getSubMenuOrItem = (item: IMenuData) => {
    if (item.children && item.children.some(child => !!child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
          key={item.path}
        >
          {getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return <Item key={item.path}>{getMenuItemPath(item)}</Item>;
    }
  };

  const getMenuItemPath = (item: IMenuData) => {
    const { icon, name, path } = item;

    return (
      <div
        onClick={() => {
          if (pathname !== path) {
            router.push(path);
          }
        }}
      >
        {getIcon(icon)}
        <span>{name}</span>
      </div>
    );
  };

  const onClickMenuItem = ({ keyPath }: ClickParam) => {
    setSelectedKeys(keyPath)
  };

  const isMainMenu = (key: string) => {
    return menu.some(item => {
      if (key) {
        return item.path === key;
      }
      return false;
    });
  };

  const handleOpenChange = (openKeys: string[]) => {
    const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey)).length > 1;
    if (moreThanOne) {
      setOpenKeys([openKeys.pop()] as string[]);
    } else {
      setOpenKeys([...openKeys])
    }
  };

  // Don't show popup menu when it is been collapsed
  const menuProps = collapsed ? {} : { openKeys };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={onCollapse}
      width={256}
      theme="light"
      className={styles.sider}
    >
      <div className={styles.logo} key="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>noPage admin</h1>
        </Link>
      </div>
      <Menu
        mode="inline"
        {...menuProps}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={{ padding: '16px 0', width: '100%' }}
        onClick={onClickMenuItem}
      >
        {getNavMenuItems(menu)}
      </Menu>
    </Sider>
  );
}
