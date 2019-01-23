import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import styles from './index.less';

export default class Image extends PureComponent {
  state = {
    previewVisible: false,
  };

  handleModal = () => {
    const { previewVisible } = this.state;
    this.setState({
      previewVisible: !previewVisible,
    });
  };

  render() {
    const { src, style = {}, className = '', ...rest } = this.props;
    const styleProps = {
      backgroundImage: `url(${src})`,
      ...style,
    };
    return (
      <>
        <div
          style={styleProps}
          className={`${styles.container} ${className}`}
          {...rest}
          onClick={this.handleModal}
        />
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleModal}>
          <img alt="example" style={{ width: '100%' }} src={src} />
        </Modal>
      </>
    );
  }
}
