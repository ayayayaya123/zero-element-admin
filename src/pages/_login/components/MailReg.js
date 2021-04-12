import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import styles from '../index.less';
import Captcha from './Captcha';

export default function MailRegForm(props) {
  const { onReg, loading } = props;
  const [email, setEmial] = useState();

  function handleChange(data) {
    setEmial(data.email);
  }


  return (
    <Form
      onFinish={onReg}
      className={styles.Form}
      onValuesChange={handleChange}
    >
      <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="邮箱"
        />
      </Form.Item>
      <Form.Item name="validateCode" rules={[{ required: false, message: '请输入验证码' }]}>
        <Captcha
          type="email"
          receiver={email}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.Button}
          loading={loading}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}