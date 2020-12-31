import React from 'react';
import ItemPanel from './ItemPanel';
import './index.less';

export default function AlonePanel({ data, map, namespace, operation, format, getData }) {
  const records = data ? [data] : [];

  return <div className="c-ImageCardList">
    {records.map((record, i) => {
      return <ItemPanel key={i}
        namespace={namespace}
        operation={operation}
        format={format}
        map={map}
        data={record}
        handle={{
          onRefresh: getData,
        }}
      />
    })}
  </div>
}