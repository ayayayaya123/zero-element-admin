import React from 'react';
import { withRouter, history } from 'umi';
import { Space, Button } from 'antd';
import global, { set as golbalSet } from 'zero-element/lib/config/global';
import { set as setEndpoint, get as getEndPoint } from 'zero-element/lib/utils/request/endpoint';

export default withRouter(function EditList(props) {
  const { namespace, location } = props;

  function switchEndpoint(path) {
    const { tempEndpoint } = global;
    if (process.env.NODE_ENV === 'development' && tempEndpoint) {
      golbalSet({
        tempEndpoint: getEndPoint(),
      });
      setEndpoint(tempEndpoint);
    }
    handleRoute(path);
  }
  function handleRoute(path) {
    history.push({
      pathname: path,
      query: {
        id: location.pathname.replace(/^\//, ''),
      }
    })
  }

  return <Space>
    <Button type="primary" onClick={switchEndpoint.bind(null, '/pageManage/tableFields')}>编辑字段</Button>
    <Button type="dashed" onClick={switchEndpoint.bind(null, '/pageManage/tableAction')}>编辑 Action</Button>
    <Button type="dashed" onClick={switchEndpoint.bind(null, '/pageManage/tableOperation')}>编辑 Operation</Button>
    <Button onClick={switchEndpoint.bind(null, '/pageManage/createForm')}>编辑[新建]表单</Button>
    <Button onClick={switchEndpoint.bind(null, '/pageManage/editForm')}>编辑[编辑]表单</Button>
  </Space>
}
)