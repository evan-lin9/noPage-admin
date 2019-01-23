import React, { useEffect, useRef } from 'react';

interface IProps {
  accept?: string;
  getRef?: (ref: any) => void;
  onChange?: (e: any) => void;
}

export default (props: IProps) => {
  const input = useRef(null);
  useEffect(() => {
    const { getRef } = props;
    if (getRef) {
      getRef(input);
    }
  });

  return (
    <input
      type="file"
      ref={input}
      style={{ visibility: 'hidden', position: 'fixed', top: -100 }}
      accept={props.accept}
      onChange={props.onChange}
    />
  )
};

