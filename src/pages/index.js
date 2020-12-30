import React from 'react';
import ZEle from 'zero-element';

export default function () {
  return (
    <div>
      首页
      <ZEle namespace="global" config={config} />
    </div>
  );
}

const config = {
  layout: 'Empty',
  items: [
    { component: 'Test' }
  ]
}