import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';

const noop = () => {};

const show = props => {
  const {
    enableValidate = true,
    title = '',
    content = { props: {} },
    cancelText = '取消',
    okText = '确认',
    onOk = noop,
    ...options
  } = props;

  const dialogCore = content.props.core;

  const handleOk = hide => {
    const values = dialogCore ? dialogCore.getValues() : {};
    const params = [values, hide, dialogCore];
    if (enableValidate && dialogCore) {
      dialogCore.validate(err => {
        if (!err) {
          onOk(...params);
        }
      });
    } else {
      onOk(...params);
    }
  };

  const ref = Modal.confirm({
    cancelText: '取消',
    className: styles.container,
    // maskClosable: true,
    iconType: ' ',
    okText: '确认',
    width: 520,
    content: (
      <>
        {title && (
          <div className="ant-modal-header">
            <div className="ant-modal-title" id="rcDialogTitle0">
              {title}
            </div>
          </div>
        )}
        <div className={styles.body}>{content}</div>
        <div className="ant-modal-footer">
          <div>
            {cancelText && <Button onClick={() => ref.destroy()}>{cancelText}</Button>}
            <Button type="primary" onClick={() => handleOk(ref.destroy)}>
              {okText}
            </Button>
          </div>
        </div>
      </>
    ),
    ...options,
  });
};

export default {
  show,
};
