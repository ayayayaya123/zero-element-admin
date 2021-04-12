import React from 'react';
import { Flex } from 'layout-flex';
import ImageView from '@/../zero-antd-dep/components/ImageView';
import { Render } from 'zero-element/lib/config/valueType';

const { FlexItem } = Flex;

export default function ({ data, indexData, operation, format }) {

  return <Flex>
    <FlexItem>
      <ImageView
        width={85}
        height={100}
        border
        value={data.image}
      />
    </FlexItem>
    <FlexItem className="padding-left" flex={1}>
      <div className="list">
        <div>
          <span className="weight">{data.imageTitle}</span>
        </div>
        <Render
          n="plain"
          data={indexData}
          options={{
            format,
          }}
          handle={{}}
        />
      </div>
    </FlexItem>
    <FlexItem>
      <div>
        {operation}
      </div>
    </FlexItem>
  </Flex>
}