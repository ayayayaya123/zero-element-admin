import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Dropdown, Menu, } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const type = 'DragableBodyRow';

export default function DragableBodyRow(props) {
  const { index, moveRow, onEdit, onRemove, record = {}, className, style, ...restProps } = props;
  const ref = useRef();

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {
          isOver: monitor.isOver(),
          dropClassName: ' drop-over-downward',
        };
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      if (typeof moveRow === 'function') {
        moveRow(item, { ...record, index });
      }
    },
  });
  const [, drag] = useDrag({
    item: { type, id: record.id, index, pid: record.pid },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={_ => onEdit(record)} >
        <EditOutlined style={{ marginRight: 8, color: '#108ee9' }} />编辑</Menu.Item>
      <Menu.Item key="delete" onClick={_ => onRemove(record)} >
        <DeleteOutlined style={{ marginRight: 8, color: '#a8071a' }} />删除</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move', ...style }}
        {...restProps}
      />
    </Dropdown>
  );
}