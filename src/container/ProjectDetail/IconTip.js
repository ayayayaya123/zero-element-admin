import React from 'react';
import { Tooltip, Button } from 'antd';

export default function ({ title, icon, style, ...rest }) {
  return <Tooltip title={title} className="ZEleA-margin-left" {...rest}>
    <Button icon={icon}
      type="primary"
      style={style}
      ghost
    />
  </Tooltip>
}