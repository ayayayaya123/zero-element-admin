import React, { useState, useEffect } from 'react';
import { Modal, Select, Input } from 'antd';

export default function EditModal({ visible, data, onClose, onChange }) {
  const [editData, setEditData] = useState({ ...data });

  useEffect(_ => {
    if (visible) {
      const { permissions, ...rest } = data;
      setEditData({
        ...rest,
        permissions: Array.isArray(permissions) ? permissions : [permissions]
      });
    }
  }, [visible]);

  function handleInputChange(field, e) {
    const v = e.target.value;
    editData[field] = v;

    setEditData({ ...editData });
  }
  function handleSelectChange(value) {
    editData.permissions = value;

    setEditData({ ...editData });
  }

  function handleSave() {
    onChange(editData);
  }

  return <Modal
    destroyOnClose
    title="编辑菜单"
    visible={visible}
    maskClosable={false}
    onCancel={onClose}
    onOk={handleSave}
  >
    <div>名称:</div>
    <Input value={editData.name} onChange={handleInputChange.bind(null, 'name')} />
    <div>路由:</div>
    <Input value={editData.path} onChange={handleInputChange.bind(null, 'path')} />
    <div>权限:</div>
    <Select
      mode="tags"
      style={{ width: '100%' }}
      value={editData.permissions}
      onChange={handleSelectChange}
      dropdownRender={_ => null}
      dropdownStyle={{ padding: 0 }}
      tokenSeparators={[',']}
    />
  </Modal>
}