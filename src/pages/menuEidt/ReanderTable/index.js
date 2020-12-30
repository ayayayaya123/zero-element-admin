import React, { useState, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import formatToData from './formatToData';
import DragableBodyRow from './DragableBodyRow';
import findMenu from './findMenu';
import EditModal from './EditModal';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '路由',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '权限',
    dataIndex: 'permissions',
    key: 'permissions',
    render: (text, record, index) => {
      if (Array.isArray(text)) {
        return text.map(t => <Tag key={t}>{t}</Tag>)
      }
      return <Tag>{text}</Tag>;
    }
  },
];

export default forwardRef(function ReanderTable({ menuData, onChange }, ref) {
  const data = menuData;
  const [visible, setVisible] = useState(false);
  const [eidtData, setEditData] = useState({});

  useImperativeHandle(ref, () => ({
    onAppend: handleAppend
  }));

  const moveRow = useCallback(
    (dragItem, hoverItem) => {

      let dragArr = data;
      let hoverArr = data;
      if (dragItem.pid !== undefined) {
        dragArr = findMenu(data, dragItem.pid).children;
      }
      if (hoverItem.pid !== undefined) {
        hoverArr = findMenu(data, hoverItem.pid).children;
      }

      let item;
      if (Array.isArray(dragArr)) {
        item = dragArr.splice(dragItem.index, 1);
      }

      if (Array.isArray(hoverArr)) {
        hoverArr.splice(hoverItem.index, 0, ...item);
      }

      setData(formatToData(data));
    },
    [data],
  );

  function handleAppend() {
    data.unshift({
      name: `新菜单${data.length}`,
      path: `/newPath_${data.length}`,
      permissions: [],
    });

    onChange(data);
  }
  function handleEdit(value) {
    setEditData(value);
    setVisible(true);
  }
  function handleRemove(value) {
    let arr = data;
    if (value.pid !== undefined) {
      arr = findMenu(data, value.pid).children;
    }

    const index = arr.findIndex(i => i.id === value.id);
    arr.splice(index, 1);
    onChange(data);
    setVisible(false);
  }
  function handleSaveEdit(value) {
    let arr = data;
    if (value.pid !== undefined) {
      arr = findMenu(data, value.pid).children;
    }

    const index = arr.findIndex(i => i.id === value.id);
    arr.splice(index, 1, value);
    onChange(data);
    setVisible(false);
  }

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  return <DndProvider backend={HTML5Backend}>
    <Table
      rowKey="path"
      defaultExpandAllRows
      columns={columns}
      dataSource={data}
      components={components}
      onRow={(record, index) => ({
        index,
        moveRow,
        record,
        onEdit: handleEdit,
        onRemove: handleRemove,
      })}
    />
    <EditModal
      visible={visible}
      data={eidtData}
      onClose={_ => setVisible(false)}
      onChange={handleSaveEdit}
    />
  </DndProvider>
})