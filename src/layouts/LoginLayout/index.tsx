import React from 'react';
import GlobalFooter from 'components/GlobalFooter';
import styles from './index.less';
import logo from 'assets/logo.svg';

export default ({ children }: any) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.header}>
          <img alt="logo" className={styles.logo} src={logo} />
          <span className={styles.title}>Nopage admin</span>
        </div>
        <div className={styles.desc}>你应该拥有更快的开发体验</div>
      </div>
      {children}
    </div>
    <GlobalFooter />
  </div>
);
