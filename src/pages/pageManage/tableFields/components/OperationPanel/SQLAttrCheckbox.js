import React from 'react';
import { Checkbox } from 'antd';

const attrOptions = [
  { label: '非空', value: 'notNull' },
  // { label: '唯一', value: 'unique' },
  { label: '递增', value: 'increase' },
]
export default function SQLAttrCheckbox({ value, onChange }) {
  const defaultValue = [];
  Object.keys(value || {}).forEach(key => {
    if (value[key]) {
      defaultValue.push(key);
    }
  });

  function handleChange(values) {
    const rst = {};
    if (Array.isArray(values)) {
      attrOptions.forEach(opt => {
        rst[opt.value] = values.includes(opt.value);
      })
      onChange(rst);
    }
  }

  return <>
    <Checkbox.Group
      onChange={handleChange}
      options={attrOptions}
      defaultValue={defaultValue}
    />
  </>
}