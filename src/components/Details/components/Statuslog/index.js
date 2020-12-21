import React, { useEffect, useState, useMemo } from 'react';
import { Spin } from 'antd';
import { query } from '@/../zero-antd-dep/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { formatTableFields } from '@/../zero-antd-dep/container/List/utils/format';
import { useModel } from 'zero-element/lib/Model';
import '../../index.less';

export default function ({ api, data, fieldsMap = {}, getData, operation, handle = {}, namespace }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const { status = {} } = fieldsMap;
  const { map = {} } = status;

  useEffect(_ => {
    setLoading(true);
    query(formatAPI(api, {}))
      .then(data => {
        setLogs(data)
      })
      .finally(_ => setLoading(false))
  }, [api, count, data._count])

  function handleRefresh() {
    getData();
    setCount(c => c + 1);
  }

  const model = useModel(namespace);
  const operationRender = useMemo(_ => {
    if (Array.isArray(operation)) {
      return formatTableFields(
        [],
        operation.map(i => {
          const { options } = i;
          return {
            ...i,
            options: {
              button: {},
              ...options,
            }
          }
        }),
        {
          ...handle,
          onRefresh: handleRefresh,
        },
        {
          namespace,
          model,
        }
      ).columns[0].render;
    }
    return _ => null;

  }, [operation]);

  return <Spin spinning={loading}>
    <div className="list Details-statusList">
      {logs.map((log, i) => {
        return <div className="time" key={i}>
          <div className="label">{map[log.status] || log.status}</div>
          <div className="value"><pre>{log.note}</pre></div>
        </div>
      })}
    </div>
    <div className="Details-statusList-operation">
      {operationRender('', data, 0)}
    </div>
  </Spin>
}