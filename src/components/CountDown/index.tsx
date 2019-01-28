import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

interface IProps {
  duration: number;
  firstText?: string;
  againText?: string;
  onClickSending: () => Promise<boolean>;
}

export default (props: IProps) => {
  const { duration, onClickSending, firstText = '获取验证码', againText = '重新发送' } = props;
  const [ second, setSecond ] = useState(0);
  const [ status, setStatus ] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (second >= 1) {
        setSecond(second - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  });

  const start = async () => {
    const res = await onClickSending();

    if (res) {
      setStatus(true);
      setSecond(duration);
    }
  };

  return (
    <Button htmlType='button' disabled={!!second} onClick={start}>
      {second ? `${second}s` : status ? againText : firstText}
    </Button>
  );
}
