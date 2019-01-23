import React, { PureComponent } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

@withRouter
@connect(({ global }) => ({ authority: global.authority }))
class Authorized extends PureComponent {
  render() {
    const {
      location: { pathname = '/' },
      authority,
      action,
      children,
      noMatch = <div />,
    } = this.props;
    let verify = authority[pathname];

    if (verify && action) {
      verify = true; // verify[action];
    }

    return verify ? children : noMatch;
  }
}

export default Authorized;
