import React, { useRef, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import ReanderTable from './ReanderTable';
import './index.less';
import { query, post } from '@/../zero-antd-dep/utils/request';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import formatToData from './ReanderTable/formatToData';

export default function menuEidt(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  useWillMount(handleQueryData);

  function handleQueryData() {
    query('/api/json/gen/menu')
      .then(data => {
        setData(formatToData(data));
      })
  }

  function handleChange(data) {
    setData(formatToData(data));
  }


  function handleAppend() {
    ref.current.onAppend();
  }

  function handleSubmit() {
    setLoading(true)
    post('/api/json/gen/menu', {
      menu: data,
    })
      .finally(_ => setLoading(false))
  }

  return <PageHeader
    ghost={false}
    onBack={() => window.history.back()}
    title="菜单编辑"
    subTitle=""
    extra={[
      <Button key="addMenu" type="primary" onClick={handleAppend} >新增菜单</Button>,
      <Button key="save" type="primary" onClick={handleSubmit} loading={loading} >保存</Button>,
    ]}
  >
    <div className="c-MenuEidt">
      <ReanderTable
        ref={ref}
        menuData={data}
        onChange={handleChange}
      />
    </div>
  </PageHeader>
}