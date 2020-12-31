import React, { useState, useRef } from 'react';
import TableFields from '../tableFields/components';
// import useBreadcrumb from '@/framework/useBreadcrumb';
import { formatAPI } from 'zero-element/lib/utils/format';
import { post } from 'zero-element-antd/lib/utils/request';
import { Modal, Input } from 'antd';
import { history } from 'umi';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function () {
  // useBreadcrumb([
  //   { title: '首页', path: '/' },
  //   { title: '页面管理', path: '/pageManage' },
  //   { title: '列表字段新增' },
  // ]);
  useWillUnmount(switchEndpoint)

  const [visible, setVisible] = useState(false);
  const promiseRef = useRef({});
  const inputValueRef = useRef();

  function handleSubmit(data) {
    setVisible(true);
    return new Promise((res, rej) => {
      promiseRef.current.res = res;
      promiseRef.current.rej = rej;
    })
      .then(_ => {
        const fAPI = formatAPI('/api/json/gen/list', {});
        return post(fAPI, {
          ...data,
          namespace: inputValueRef.current,
        })
          .then(_ => {
            setVisible(false);
            history.goBack();
            return Promise.resolve();
          })
      })
      .catch(_ => void 0)
  }

  return <>
    <TableFields
      title="列表字段新增"
      onSubmit={handleSubmit}
    />
    <Modal
      title="设置页面的 namespace"
      destroyOnClose
      visible={visible}
      onCancel={_ => {
        setVisible(false);
        promiseRef.current.rej();
      }}
      onOk={_ => promiseRef.current.res()}
    >
      <Input
        onChange={e => inputValueRef.current = e.target.value}
      />
    </Modal>
  </>;
}