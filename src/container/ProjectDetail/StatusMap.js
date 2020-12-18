import React from 'react';
import { Table, Button, Input } from 'antd';

export default function StatusMap({
  data,
  onAppend, onRemove, onChange,
  onCancel, onSave
}) {

  return <div>
    <Button type="primary" icon="plus" onClick={onAppend}>新增</Button>
    <EditTable
      data={data}
      onRemove={onRemove}
      onChange={onChange}
    />
    <br />
    <div style={{ textAlign: 'right' }}>
      <Button onClick={onCancel}>取消</Button>
      <Button type="primary" className="ZEleA-margin-left" onClick={onSave}>保存</Button>
    </div>
  </div>
}

function EditTable({ data, onRemove, onChange }) {
  function handleChange(id, field, e) {
    onChange(id, field, e.target.value);
  }

  return <Table
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
        key: 2, title: '', dataIndex: 'operation',
        render: (text, record) => <Button
          shape="circle" icon="delete"
          type="danger"
          onClick={onRemove.bind(null, record.id)}
        />
      },
    ]}
  />
}