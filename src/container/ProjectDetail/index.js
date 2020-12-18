import React, { useEffect, useReducer, useRef } from 'react';
import { query, post, remove } from 'zero-element-antd/lib/utils/request';
import { Spin, Card, Table, Modal } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import { Flex } from 'layout-flex';
import Tree from 'zero-element-antd/lib/components/Tree';
import {
  TableOutlined,
  ToolOutlined,
  FolderAddOutlined,
  EllipsisOutlined,
  FileAddOutlined,
  EditOutlined,
  ProfileOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import hender from './dispatch';

import IconTip from './IconTip';
import CreateGuide from './CreateGuide';
import { withRouter, history } from 'umi';
import PageAPI from './PageAPI';

const { FlexItem } = Flex;

const initData = {
  treeNodeData: {},
  columns: [],
  edit: false, // 列表字段编辑状态
  columnsEditing: [], // 编辑状态下保存的数据，之后直接用于提交
  createFormId: null,
  updateFormId: null,
  visible: false, // 页面属性编辑模态框
  loading: false,
};

export default withRouter(function TreeList(props) {
  const { namespace, config, location } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    tree = {},
  } = config;
  const uuid = location.query.uuid;
  const defaultSelected = location.query.sKey;

  const { API: treeAPI, searchField = 'search' } = tree;

  const treeRef = useRef();
  const [state, dispatch] = useReducer(hender, initData);
  const {
    pageName,
    treeNodeData, columns,
    createFormId, updateFormId, detailFormId,
    pageType,
    visible,
    loading,
  } = state;

  useEffect(_ => {
    // 点击了子节点，获取列表数据
    if (treeNodeData.id) {
      queryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeNodeData]);

  function handleReInit() {
    treeRef.current.onReInit();
    history.push({
      pathname: '/pageManage',
    });
  }

  function queryData() {
    const api = `/api/json/gen/list/${treeNodeData.id}`;
    dispatch({
      type: 'loadStart',
    });
    query(api)
      .then(data => {
        dispatch({
          type: 'initData',
          payload: data,
        });
      })
  }
  function handleSelect(data) {
    dispatch({
      type: 'selectTreeNode',
      payload: data,
    });
    history.push({
      pathname: '/pageManage',
      query: {
        sKey: data.id,
      }
    });
  }
  function handleCreatePage(pageType, {
    createFormId,
    updateFormId,
    scope,
  }) {
    const api = `/api/generate/page/${uuid}/menu/${treeNodeData.id}`;
    dispatch({
      type: 'loadStart',
    });
    post(api, {
      pageType,
      createFormId,
      updateFormId,
      scope,
    })
      .then(queryData)
  }
  function handleColumsEdit() {
    history.push({
      pathname: '/pageManage/tableFields',
      query: {
        id: treeNodeData.id,
      }
    });
  }
  function pathToListAction() {
    history.push({
      pathname: '/pageManage/tableAction',
      query: {
        id: treeNodeData.id,
      }
    });
  }
  function pathToListOperation() {
    history.push({
      pathname: '/pageManage/tableOperation',
      query: {
        id: treeNodeData.id,
      }
    });
  }
  function pathToEditForm(id, type) {
    // history.push({
    //   pathname: '/gen/details-form',
    //   query: {
    //     id,
    //     uuid,
    //     menuId: treeNodeData.id,
    //     type,
    //   }
    // });
  }
  function handleRemove() {
    const api = `/api/json/gen/list/${treeNodeData.id}`;
    Modal.confirm({
      title: `确定要删除页面 ${treeNodeData.id} ?`,
      onOk() {
        remove(api).then(handleReInit);
      },
      onCancel() { },
    })
  }
  function handleVisible() {
    dispatch({
      type: 'apiModalVisible',
    });
  }

  return <Render n={layout} {...layoutConfig}>
    <Flex align="flex-start">
      {treeAPI ? (<FlexItem>
        <Tree
          className="hide-file-icon"
          defaultExpandAll
          showLine
          showIcon
          API={treeAPI}
          searchField={searchField}
          namespace={namespace}
          onChange={handleSelect}
          defaultAelectedKeys={[defaultSelected]}
          ref={treeRef}
        />
      </FlexItem>) : null}
      <FlexItem className="ZEleA-margin-left" flex={1} style={{
        overflow: 'auto',
      }}>
        <Spin spinning={loading}>
          {columns.length ?
            (<Card size="small"
              title={`${pageName}`}
              extra={<>
                {pageType !== 'category' ? (
                  <>
                    <IconTip
                      title="列表字段" icon={<TableOutlined />}
                      onClick={handleColumsEdit}
                    />
                    <IconTip
                      title="页面属性" icon={<ToolOutlined />}
                      onClick={handleVisible}
                    />
                    <IconTip
                      title="列表 action" icon={<FolderAddOutlined />}
                      onClick={pathToListAction}
                    />
                    <IconTip
                      title="列表 operation" icon={<EllipsisOutlined />}
                      onClick={pathToListOperation}
                    />
                    <IconTip title="[添加]表单" icon={<FileAddOutlined />}
                      style={{
                        color: '#006d75',
                        borderColor: '#006d75',
                      }}
                      onClick={pathToEditForm.bind(null, createFormId, 'add')}
                    />
                    <IconTip title="[编辑]表单" icon={<EditOutlined />}
                      style={{
                        color: '#006d75',
                        borderColor: '#006d75',
                      }}
                      onClick={pathToEditForm.bind(null, updateFormId, 'edit')}
                    />
                    <IconTip title="[详情]表单" icon={<ProfileOutlined />}
                      style={{
                        color: '#006d75',
                        borderColor: '#006d75',
                      }}
                      onClick={pathToEditForm.bind(null, detailFormId, 'detail')}
                    />
                  </>
                ) : null}
                <IconTip title="删除该页面"
                  style={{
                    color: '#ff4d4f',
                    borderColor: '#ff4d4f',
                  }}
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                />
              </>}
            >
              <div className="deta">
                <Table
                  columns={columns}
                  dataSource={[]}
                />
              </div>
            </Card>)
            : <CreateGuide
              namespace={namespace}
              data={treeNodeData}
              onCreatePage={handleCreatePage}
            />
          }
        </Spin>
      </FlexItem>
    </Flex>
    <Modal
      title="编辑页面属性"
      destroyOnClose
      visible={visible}
      onCancel={handleVisible}
      footer={null}
      bodyStyle={{
        padding: 0,
      }}
    >
      <PageAPI
        uuid={uuid}
        menuId={treeNodeData.id}
      />
    </Modal>
  </Render>
})