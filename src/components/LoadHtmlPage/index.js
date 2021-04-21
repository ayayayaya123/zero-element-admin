import React from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from 'zero-element-antd/lib/container/List/utils/useListHandle';

export default function LoadHtmlPage(props) {
  const { namespace, config, extraData, extraEl } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
  } = config;

  const [
    tableProps, tableData, handle, actionsItems,
    {
      operationData,
      renderBatchOperation,
    }
  ] = useListHandle({
    namespace,
    extraData,
    config,
    props,
  });

  console.log('props = ', props)
  console.log('tableProps = ', tableProps)
  console.log('tableData = ', tableData)
  console.log('actionsItems = ', actionsItems)

  return <Render n={layout} {...layoutConfig}
    handle={handle}
    namespace={namespace}
  >
    <iframe
        src="file:///D:/workspace2015/docxFile/copy/对经营高危险性体育项目的行政许可.pdf"
        style={{ width: '100%', border: '0px', height: '1100px' }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        scrolling="auto"
      />
  </Render>
}