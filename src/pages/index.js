import React from 'react';
import ZEle from 'zero-element';
import { history } from 'umi';

import MasterReaource from './masterResource';

export default function () {

  /**
   * <div>
      首页
      <ZEle namespace="global" config={config} />
    </div>
   */
  //默认跳转到 masterResource
  history.push('/masterResource');

  return (
    <MasterReaource/>
  );
}

const config = {
  layout: 'Empty',
  items: [
    { component: 'Test' }
  ]
}