import React, { useMemo } from 'react';
import Panel from '@/components/Panel';
import Item from './Item';
import { formatAPI } from 'zero-element/lib/utils/format';
import { formatTableFields } from '@/../zero-antd-dep/container/List/utils/format';
import { useModel } from 'zero-element/lib/Model';
import { isNull } from 'util';
import { Space } from 'antd';

export default function (props) {
  const { data = {}, map = {}, namespace, operation, format, handle = {}, index, } = props;

  const model = useModel(namespace);
  const operationRender = useMemo(_ => {
    if (Array.isArray(operation)) {
      return formatTableFields([], operation, handle, {
        namespace,
        model,
      }).columns[0].render;
    }
    return _ => null;

  }, [operation]);

  function getValue(value) {
    if (value === false) {
      return null;
    }
    return formatAPI(value, {
      namespace,
      data,
      placeholder: '',
    });
  }

  const beforeData = {
    title: getValue(map.title),
    subTitle: getValue(map.subTitle),
    image: getValue(map.image),
    imageTitle: getValue(map.imageTitle),
  };

  const classes = [
    isNull(beforeData.title) && isNull(beforeData.subTitle) ? 'isNotTitle' : '',
    isNull(format) && isNull(beforeData.image) && isNull(beforeData.imageTitle) ? 'isNull' : '',
  ]

  return <Panel
    className={classes.join(' ')}
    collapseIcon={false}
    title={
      <Space>
        <div>{beforeData.title}</div>
        <div className="weight-400">{beforeData.subTitle}</div>
      </Space>
    }>
    <Item data={beforeData} indexData={{
      text: '',
      record: data,
      index,
      type: '',
    }}
      format={format}
      operation={operationRender('', data, index)}
    />
  </Panel>
}