import React from 'react';
import ZEle from 'zero-element';
import { setPageData } from 'zero-element/lib/Model';

const hideFooter = [
  'FINISHED', 'VERIFIED'
];

export default function ({ namespace, index, canExtraData, config, data, getData, footer }) {

  if (!data || !data.id) {
    return null;
  }
  setPageData(namespace.replace('view', index), 'detailData', data);

  return <div className="Details-container">
    <ZEle
      namespace={namespace.replace('view', index)}
      config={config}
      extraData={canExtraData ? data : undefined}
      onClose={getData}
      goBack={false}
      footer={hideFooter.includes(data.status) ? null : footer}
    />
  </div>
}