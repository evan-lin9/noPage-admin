import { message } from 'antd';

export default function config() {
  return {
    onError(error, dispatch) {
      const { name, message: msg } = error;
      if (name === '4003' || name === '4004') {
        dispatch({
          type: 'global/logout',
        });
        return;
      }
      message.error(msg);
    },
  };
}
