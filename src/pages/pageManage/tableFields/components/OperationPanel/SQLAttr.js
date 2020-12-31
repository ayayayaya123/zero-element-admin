import React, { useRef, useState } from 'react';
import { Button, Modal, Form, Checkbox, Input, Row, Col } from 'antd';
import SQLAttrCheckbox from './SQLAttrCheckbox';

export default function SQLAttr({ data, onChange }) {
  const [visible, setVisible] = useState(false);
  const valuesRef = useRef();

  function handleOpen() {
    valuesRef.current = { ...data.sqlInfo };
    setVisible(true);
  }

  function onValuesChange(_, allValues) {
    valuesRef.current = allValues;
  }

  function handleChange() {
    onChange('sqlInfo', valuesRef.current);
    setVisible(false);
  }

  return <>
    <Button type="primary" onClick={handleOpen}>编辑</Button>
    <Modal
      destroyOnClose
      title={`编辑 ${data.label} 的 SQL 属性`}
      visible={visible}
      onCancel={_ => setVisible(false)}
      onOk={handleChange}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={data.sqlInfo}
        onValuesChange={onValuesChange}
      // onFinishFailed={onFinishFailed}
      >
        <Row
          justify="space-around" align="middle"
          gutter={[16, 16]}
        >
          <Col flex={1}>
            <Form.Item
              label="字段"
              name="field"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              label="数据类型"
              name="type"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row
          justify="space-around" align="middle"
          gutter={[16, 16]}
        >
          <Col flex={1}>
            <Form.Item
              label="默认值"
              name="defaultValue"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              label="备注"
              name="comment"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row
          justify="space-around" align="middle"
          gutter={[16, 16]}
        >
          <Col flex={1}>
            <Form.Item
              label="属性"
              name="attr"
            >
              <SQLAttrCheckbox />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  </>
}