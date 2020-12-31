import React from 'react';
import ZEle from 'zero-element';

import MasterReaource from './masterResource';

export default function () {

  /**
   * <div>
      首页
      <ZEle namespace="global" config={config} />
    </div>
   */

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