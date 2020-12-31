import React, { Fragment } from 'react';
import Card from '@/components/Card';
import Details from '@/components/Details';
import useDetails from '@/components/Details/hooks';
import checkExpected from '@/../zero-antd-dep/utils/checkExpected';

import ImageCardList from '@/components/Details/components/ImageCardList';
import ImageCard from '@/components/Details/components/ImageCardList/AlonePanel';
import ZEle from '@/components/Details/components/ZEle';
import Statuslog from '@/components/Details/components/Statuslog';

import { Flex } from 'layout-flex';

import './index.less';

const { FlexItem } = Flex;

const componentMap = {
  plain: Details,
  cardList: ImageCardList,
  card: ImageCard,
  zele: ZEle,
  statusLog: Statuslog,
};

export default function ({ namespace, setting, config }) {
  const [data, loading, getData] = useDetails(namespace, setting.getAPI);
  const { left = [], right = [] } = config;

  const otherProps = {
    loading,
    fieldsMap: setting.map,
    col: setting.columns,
    data,
    getData,
  };

  return <Flex align="flex-start">
    <FlexItem flex={1}>
      {left.map((opt, i) => renderCard(namespace, i, opt, otherProps))}
      <br /><br />
    </FlexItem>
    {right && right.length ? (
      <FlexItem className="Details-other">
        {right.map((opt, i) => renderCard(namespace, i, opt, otherProps))}
      </FlexItem>
    ) : null}
  </Flex>
}

function renderCard(namespace, index, opt, props) {
  const { title, type, expect, ...restOpt } = opt;

  const C = componentMap[type];

  if (!checkExpected(props.data || {}, expect || {})) {
    return null;
  }

  if (!C) {
    return `未知的 view type: ${type}`;
  }

  return <Fragment key={`${title}-${type}`}>
    <Card title={title}>
      <C
        {...props}
        {...restOpt}
        index={index}
        namespace={namespace}
      />
    </Card><br />
  </Fragment>
}