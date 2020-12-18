import React from 'react';
import { InputNumber } from 'antd';

export default function AttrInputNumber({
  field, value,
  onChange,
}) {
  function handleChange(value) {
    onChange(field, value);
  }
  return <InputNumber
    value={value}
    onChange={handleChange}
  />
}