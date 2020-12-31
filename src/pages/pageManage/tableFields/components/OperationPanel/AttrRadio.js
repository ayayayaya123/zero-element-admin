import React from 'react';
import { Radio } from 'antd';

export default function AttrRadio({
  field, value, items,
  onChange,
}) {
  function handleChange(e) {
    const value = e.target.value;
    onChange(field, value);
  }
  return <Radio.Group
    name={field}
    value={value}
    onChange={handleChange}
  >
    {items.map((item, i) => {
      return <Radio key={i} value={item.value}>{item.label}</Radio>
    })}
  </Radio.Group>
}