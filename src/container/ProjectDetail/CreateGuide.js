import React, { useState, useEffect } from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from 'zero-element-antd/lib/utils/request';
import { Button, Select, Radio, Input, Empty } from 'antd';
import { Flex } from 'layout-flex';

const { Option } = Select;
const { FlexItem } = Flex;

export default function ({ namespace, data, onCreatePage }) {
  const [createState, setCreateState] = useState(false);
  const [formList, setFormList] = useState([]);
  const [formCreateId, setFormCreateId] = useState(null);
  const [formEditId, setFormEditId] = useState(null);
  const [pageType, setPageType] = useState('general');
  const [scope, setScope] = useState('');

  useEffect(_ => {
    setCreateState(false);
    setFormList([]);
    setFormCreateId(null);
    setFormEditId(null);
  }, [data.id]);

  useEffect(_ => {
    if (createState) {
      queryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState]);

  function queryData() {
    const api = formatAPI(
      '/api/generate/form/[uuid]',
      { namespace }
    );
    query(api)
      .then(data => {
        setFormList(data);
      })
  }
  function handleCreate() {
    setCreateState(!createState);
  }
  function handleSelectCreatePage(value) {
    setFormCreateId(value);
  }
  function handleSelectEditPage(value) {
    setFormEditId(value);
  }
  function handleCreatePage() {
    onCreatePage(pageType, {
      createFormId: formCreateId,
      updateFormId: formEditId,
      scope,
    });
  }
  function handlePageTypeChange(e) {
    setPageType(e.target.value);
    setFormCreateId(null);
    setFormEditId(null);
    setScope('');
  }
  function handleScopeChange(e) {
    setScope(e.target.value);
  }

  return <div>
    {data.id ? (
      <div>
        当前路由: {data.fullPath || data.path}
      </div>
    )
      : <Empty description="未选择页面" />
    }
    <br />
    {data.canCreatePage && !createState ?
      <Button type="primary" onClick={handleCreate}>新建页面</Button>
      : null
    }
    {createState ? (
      <div>
        <div>页面类型</div>
        <Radio.Group name="pageType"
          defaultValue={pageType}
          onChange={handlePageTypeChange}
        >
          <Radio value="general">普通列表</Radio>
          <Radio value="category">分类列表</Radio>
        </Radio.Group>
        <br /><br />
        {pageType === 'general' ? (
          <>
            <div>根据表单建立页面</div>
            <Flex>
              <FlexItem flex={1}>
                <div>选择[新建]页面表单</div>
                <div>将会以此作为模板来创建[列表]页</div>
                <div>
                  <Select onChange={handleSelectCreatePage} style={{ width: 120 }}>
                    {formList.map(item => (
                      <Option key={item.id} value={item.id}>{item.title}</Option>
                    ))}
                  </Select>
                </div>
              </FlexItem>
              <FlexItem flex={1}>
                <div>选择[编辑]页面表单</div>
                <div>将会以此作为模板来创建[详情]页</div>
                <div>
                  <Select onChange={handleSelectEditPage} style={{ width: 120 }}>
                    {formList.map(item => (
                      <Option key={item.id} value={item.id}>{item.title}</Option>
                    ))}
                  </Select>
                </div>
              </FlexItem>
            </Flex>
          </>
        ) : (
            <div>
              类别 scope:
              <Input
                style={{ width: 120, marginLeft: 4 }}
                onChange={handleScopeChange}
                value={scope}
              />
            </div>
          )}
        <br />
        <Button type="primary"
          disabled={!(formCreateId && formEditId || scope)}
          onClick={handleCreatePage}
        >
          创建
        </Button>
      </div>
    ) : null}

  </div>
}