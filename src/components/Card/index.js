import React from 'react';
import { Flex } from 'layout-flex';

import './index.less';

const { FlexItem } = Flex;

export default function ({ title, children }) {
  const [child, extra] = React.Children.toArray(children);

  return <div className="c-Card">
    <Flex
      className="content"
    >
      <FlexItem>
        <div className="title">{title}</div>
      </FlexItem>
      <div className="fill"></div>
      <FlexItem flex={1}>
        {extra}
      </FlexItem>
    </Flex>
    {child}
  </div>
}