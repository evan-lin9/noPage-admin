import React, { useState, useEffect } from 'react';
import { connect, SubscriptionAPI } from 'dva';
import {
  Card,
  Button,
  Badge,
  Tree,
} from 'antd';

const { TreeNode } = Tree;
const initialCreateFormValues = {
  sortId: 0,
  parentMenuId: 0,
  willParentMenuId: '0',
  menuId: 0,
  menuName: '',
  icon: '',
  path: '',
  url: '',
  description: '',
  isHide: 0,
};

interface IProps extends SubscriptionAPI {
  menuList: [];
}


export default connect(({ menu }: any) => menu)((props: IProps) => {
  const { dispatch, menuList } = props;

  const [visible, setVisibel] = useState(false);
  const [initFormValues, setFormValues] = useState(initialCreateFormValues);

  useEffect(() => {
    dispatch({
      type: 'menu/read'
    });
  }, []);

  console.log(props, menuList);
  // const renderTreeNodes = data => {
  //   return data.map(item => {
  //     const props = {
  //       key: item.key,
  //     };
  //     const { parentMenuId, path, menuId, key: recursiveKey } = item;
  //     if (item.children) {
  //       return (
  //         <TreeNode
  //           {...props}
  //           title={
  //             <TreeTitle
  //               {...item}
  //               recursiveKey={recursiveKey}
  //               onCreate={() =>
  //                 this.handleCreateModalVisible(true, {
  //                   ...initialCreateFormValues,
  //                   path,
  //                   parentMenuId,
  //                   willParentMenuId: menuId,
  //                 })
  //               }
  //               onEdit={() => this.handleCreateModalVisible(true, item)}
  //               onDelete={() => this.handleDelete(menuId)}
  //             />
  //           }
  //         >
  //           {this.renderTreeNodes(item.children)}
  //         </TreeNode>
  //       );
  //     } else {
  //       return (
  //         <TreeNode
  //           {...props}
  //           title={
  //             <TreeTitle
  //               {...item}
  //               recursiveKey={item.key}
  //               onCreate={() =>
  //                 this.handleCreateModalVisible(true, {
  //                   ...initialCreateFormValues,
  //                   path,
  //                   parentMenuId,
  //                   willParentMenuId: menuId,
  //                 })
  //               }
  //               onEdit={() => this.handleCreateModalVisible(true, item)}
  //               onDelete={() => this.handleDelete(item.menuId)}
  //             />
  //           }
  //         />
  //       );
  //     }
  //   });
  // };

  return (
    <Card bordered={false}>
      <div className="tableList">
        <div className="tableListOperator">
          <div style={{float: 'right'}}>
            <Badge status="processing" />开启
            <Badge status="warning" style={{marginLeft:'10px'}} />关闭
          </div>
        </div>
        {/*<Tree>{renderTreeNodes(menuList)}</Tree>*/}
      </div>
    </Card>
  );
});

