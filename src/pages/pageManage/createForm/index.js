import React from 'react';
import ZEle from 'zero-element';
import config from './config';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import global, { set as golbalSet } from 'zero-element/lib/config/global';
import { set as setEndpoint, get as getEndPoint } from 'zero-element/lib/utils/request/endpoint';

export default () => {
  useWillUnmount(_ => {
    const { tempEndpoint } = global;
    if (process.env.NODE_ENV === 'development' && tempEndpoint) {
      golbalSet({
        tempEndpoint: getEndPoint(),
      });
      setEndpoint(tempEndpoint);
    }
  })
  return <ZEle namespace="gen" config={config} />;
};
