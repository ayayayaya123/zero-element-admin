import React, { useState, useEffect, useRef } from 'react';
import { Input, Row, Col, Button } from 'antd';
import TitleContent from '@/components/TitleContent';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import styles from '../index.less';
import StatusMap from './StatusMap';
import AttrRadio from './AttrRadio';
import AttrInputNumber from './AttrInputNumber';
import RenderTypeSelect from './RenderTypeSelect';
import SQLAttr from './SQLAttr';

export default function OperationPanel({
  data,
  onCancel, onMove, onRemove, onSave
}) {
  const { options = {} } = data;
  const { map, color, ...restOpt } = options;
  const [columnData, setColumnData] = useState({});
  const [valueMap, setValueMap] = useState([]);
  const idCount = useRef(0);

  useEffect(_ => {
    const { options = {} } = data;
    const { map, color } = options;

    setColumnData(
      JSON.parse(JSON.stringify(data))
    );
    formatMapData(map, color);
  }, [data]);
  useEffect(_ => {
    formatMapData(map, color);
  }, [map, color])

  function formatMapData(map, color) {
    if (map) {
      setValueMap(Object.keys(map).map(key => {
        const id = idCount.current + 1;
        idCount.current = id;
        return {
          id,
          source: key,
          target: map[key],
          color: color[key] || '#1890ff',
        }
      }));
    } else {
      setValueMap([]);
    }
  }

  function handleBaseValueChange(field, e) {
    const value = e.target.value;
    columnData[field] = value;
    setColumnData({ ...columnData });
  }
  function handleRemove() {
    onRemove(data.key);
  }
  function handelMoveUp() {
    onMove('up', data.key);
  }
  function handelMoveDown() {
    onMove('down', data.key);
  }

  function handleAppendMap() {
    const id = idCount.current + 1;
    idCount.current = id;
    valueMap.push({
      key: id,
      id,
      source: `map_${id}`,
      target: '新映射',
      color: '#1890ff',
    });

    setValueMap([...valueMap]);
  }
  function handleRemoveMap(id) {
    const newMap = valueMap.filter(c => c.id !== id);
    setValueMap([...newMap]);
  }
  function handleChangeMap(id, field, value) {
    const find = valueMap.find(c => c.id === id);
    if (find) {
      find[field] = value;
      setValueMap([...valueMap]);
    }
  }
  function handleChangeAttr(field, value) {
    columnData[field] = value;
    setColumnData({ ...columnData });
  }

  function handleSave() {
    const { valueType } = columnData;
    const mapObj = {};
    const color = {};
    valueMap.forEach(item => {
      mapObj[item.source] = item.target;
      color[item.source] = item.color;
    });

    onSave({
      ...columnData,
      valueType: valueType ? valueType : undefined,
      options: {
        ...restOpt,
        map: valueType === 'tag' ? mapObj : undefined,
        color: valueType === 'tag' ? color : undefined,
      }
    });
  }

  return <TitleContent title="操作面板">
    {columnData.field ? (
      <Row className="ZEleA-Layout-Content">
        <Col span={8} className={styles.padding}>
          <div className={styles.title}>字段:</div>
          <Input
            value={columnData.field}
            onChange={handleBaseValueChange.bind(null, 'field')}
          />
          <div>字段名:</div>
          <Input
            value={columnData.label}
            onChange={handleBaseValueChange.bind(null, 'label')}
          />
          <div>SQL 属性:</div>
          <SQLAttr data={columnData} onChange={handleChangeAttr} />
        </Col>
        <Col span={10} className={styles.padding}>
          <div className={styles.title}>数据渲染类型</div>
          <RenderTypeSelect
            field="valueType"
            value={columnData.valueType}
            onChange={handleBaseValueChange.bind(null, 'valueType')}
          />
          {columnData.valueType === 'tag' ? (
            <>
              <br />
              <StatusMap
                data={valueMap}
                onAppend={handleAppendMap}
                onRemove={handleRemoveMap}
                onChange={handleChangeMap}
              />
            </>
          ) : null}
        </Col>
        <Col span={6}>
          <div className={styles.title}>列属性</div>
          <AttrRadio
            field="align"
            value={columnData.align || 'left'}
            items={[
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' },
            ]}
            onChange={handleChangeAttr}
          />
          <div className={styles.title}>列宽度</div>
          <AttrInputNumber
            field="width"
            value={columnData.width > 0 ? columnData.width : null}
            onChange={handleChangeAttr}
          />
        </Col>
      </Row>
    ) : <div className="ZEleA-Layout-Content">
        <div>点击上方 表头列名 继续</div>
        <div>修改完成后需要 保存</div>
      </div>}
    {columnData.field ? (
      <>
        <Button
          icon={<ArrowUpOutlined />} shape="circle"
          onClick={handelMoveUp}
        />
        <Button
          className="ZEleA-margin-left"
          icon={<ArrowDownOutlined />} shape="circle"
          onClick={handelMoveDown}
        />
        <Button
          className="ZEleA-margin-left"
          onClick={onCancel}
        >取消</Button>
        <Button type="danger" className="ZEleA-margin-left"
          onClick={handleRemove}>删除</Button>
        <Button type="primary" className="ZEleA-margin-left"
          onClick={handleSave}>确认</Button>
      </>
    ) : null}
  </TitleContent>
}