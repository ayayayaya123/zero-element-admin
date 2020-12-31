import React, { useState, useRef, useEffect } from 'react';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { PageHeader, Layout, Table, Button } from 'antd';
import { query } from 'zero-element-antd/lib/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { withRouter } from 'umi';
import Tag from 'zero-element-antd/lib/valueType/tag';
import {
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import styles from './index.less';
import OperationPanel from './OperationPanel';

const { Content } = Layout;

export default withRouter(function DetailsList({ title, location, namespace, onSubmit }) {
  const [columns, setColumns] = useState([]);
  const sqlData = useRef([]);
  const [editColumn, setEditColumn] = useState({});
  const [loading, setLoading] = useState(false);
  const idCount = useRef(0);

  useDidMount(_ => {
    const fapi = `/api/json/gen/list/${encodeURIComponent(location.query.id)}`;

    setLoading(true);
    query(fapi).then(data => {
      const { columns = [], sqlInfo = [] } = data;
      sqlData.current = sqlInfo;
      setColumns(columns.map(c => formatToAntd(c)));
    })
      .finally(_ => {
        setLoading(false);
      })
  });
  useEffect(_ => {
    setColumns(columns.map(c => changeClassName(c)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editColumn])

  function changeClassName(data) {
    const { dataIndex } = data;
    data.className = (dataIndex && editColumn.field === dataIndex) ? styles.action : '';

    return data;
  }
  function formatToAntd(data) {
    const { id, field, valueType, label, ...rest } = data;

    const rst = {
      ...rest,
      key: id || field,
      dataIndex: field,
      title: label,
      valueType,
      className: (field && editColumn.field === field) ? styles.action : undefined,
      onHeaderCell: () => ({
        onClick: _ => {
          const find = sqlData.current.find(i => i.id === field);
          setEditColumn({
            ...data,
            sqlInfo: find,
            key: id || field,
          })
        },
      })
    };

    if (valueType === 'tag') {
      rst.render = (text) => <Tag
        data={{
          text,
        }}
        options={data.options}
      />
    }

    return rst;
  }
  function formatToConfig(column) {
    const {
      id, key, render,
      dataIndex, title, ...rest
    } = column;
    return {
      ...rest,
      field: dataIndex,
      label: title,
    }
  }

  function handleEditCancel() {
    setEditColumn({});
  }
  function handleAppendColumn() {
    const id = idCount.current++;
    columns.push(
      formatToAntd({
        key: id,
        id,
        field: `column_${id}`,
        label: '新列',
      })
    );

    setColumns([...columns]);
    setEditColumn({});
  }
  function handleRemoveColumn(key) {
    const newColumns = columns.filter(c => c.key !== key);
    setColumns([...newColumns]);
    setEditColumn({});
  }

  function handleMoveColumn(type, key) {
    const index = columns.findIndex(c => c.key === key);
    arrayItemMove(columns, type, index);
    setColumns([...columns]);
    setEditColumn({});
  }

  function handleColumnChange(newColumn) {
    const { key, sqlInfo } = newColumn;
    const index = columns.findIndex(c => c.key === key);
    const sqlIndex = sqlData.current.findIndex(i => i.id === key);

    columns.splice(index, 1, formatToAntd(newColumn));
    if (sqlIndex > -1) {
      sqlData.current.splice(sqlIndex, 1, sqlInfo);
    } else {
      sqlData.current.push({
        ...sqlInfo,
        id: key,
      });
    }

    setColumns([...columns]);
    setEditColumn({});
  }

  function handleSave() {
    Promise.resolve().then(_ => {
      setLoading(true);
      onSubmit({
        columns: columns.map(c => formatToConfig(c)),
        sqlData: sqlData.current,
      })
        .finally(_ => {
          setLoading(false);
        })
    })
  }

  return <>
    <PageHeader
      title={title}
      ghost={false}
      onBack={() => window.history.back()}
      extra={[
        <Button key="add" type="dashed" icon={<PlusOutlined />} onClick={handleAppendColumn}>
          新增列
        </Button>,
        <Button key="save" type="primary" icon={<SaveOutlined />} className="ZEleA-margin-left"
          loading={loading}
          onClick={handleSave}
          disabled={Boolean(editColumn.field)}
          title={Boolean(editColumn.field) ? '需要先保存 操作面板 的数据' : ''}
        >
          保存
        </Button>
      ]}
    >
      <Content>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={[
            { key: -1, id: -1, name: '示例数据', title: '示例数据' }
          ]}
          pagination={false}
        />
      </Content>
    </PageHeader>
    <br />
    <OperationPanel
      data={editColumn}
      onCancel={handleEditCancel}
      onMove={handleMoveColumn}
      onRemove={handleRemoveColumn}
      onSave={handleColumnChange}
    />
  </>
});

/**
 * 上移或下移数组内的某一项，直接改变原数组
 *
 * @export
 * @param {array} arr
 * @param {string} type up | down
 * @param {number} index
 */
export function arrayItemMove(arr, type, index) {
  if (!Array.isArray(arr) || arr.length < 2) return false;

  if (type === 'up' && index > 0) {
    arr.splice(
      index - 1,
      1,
      ...arr.splice(index, 1, arr[index - 1]),
    );
  } else if (type === 'down' && index < arr.length - 1) {
    arr.splice(
      index + 1,
      1,
      ...arr.splice(index, 1, arr[index + 1]),
    );
  }
};