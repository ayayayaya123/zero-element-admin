import React from 'react';
import { Table, Button, Input } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export default function StatusMap({
  data,
  onAppend, onRemove, onChange,
  // onCancel, onSave
}) {

  return <div>
    <Button type="primary" icon={<PlusOutlined />} onClick={onAppend}>新增</Button>
    <EditTable
      data={data}
      onRemove={onRemove}
      onChange={onChange}
    />
  </div>
}

function EditTable({ data, onRemove, onChange }) {
  function handleChange(id, field, e) {
    onChange(id, field, e.target.value);
  }

  return <Table
    rowKey="id"
    pagination={false}
    dataSource={data}
    columns={[
      {
        key: 0, title: '将', dataIndex: 'source',
        render: (text, record) => <Input value={text}
          onChange={handleChange.bind(null, record.id, 'source')}
        />
      },
      {
        key: 1, title: '映射为', dataIndex: 'target',
        render: (text, record) => <Input value={text}
          onChange={handleChange.bind(null, record.id, 'target')}
        />
      },
      {
        key: 2, title: '颜色', dataIndex: 'color',
        render: (text, record) => <Input value={text}
          onChange={handleChange.bind(null, record.id, 'color')}
        />
      },
      {
        key: 3, title: '', dataIndex: 'operation',
        render: (text, record) => <Button
          shape="circle" icon={<DeleteOutlined />}
          type="danger"
          onClick={onRemove.bind(null, record.id)}
        />
      },
    ]}
  />
}