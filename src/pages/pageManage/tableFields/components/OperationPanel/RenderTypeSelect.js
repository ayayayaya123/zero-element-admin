import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function RenderTypeSelect({ value = '', onChange }) {
  function handleChange(value) {
    onChange({ target: { value } });
  }
  return <div>
    <Select defaultValue="" value={value} onChange={handleChange}>
      <Option value="">无</Option>
      <Option value="currency">货币</Option>
      <Option value="image">图片</Option>
      <Option value="tag">字段映射</Option>
    </Select>
  </div>
}