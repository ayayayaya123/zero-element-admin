import React, { useEffect, useState, useRef } from 'react';
import { history, Route } from 'umi';
import { Layout, Button, message, Modal } from 'antd';
import { saveToken } from 'zero-element/lib/utils/request/token';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import JParticles from 'jparticles';
import AccountForm from './components/Account';
import MailReg from './components/MailReg';
import PhoneReg from './components/PhoneReg';
import CaptchaLigin from './components/CaptchaLogin';
import RFE from './components/RetrieveFromEmail';
import RFP from './components/RetrieveFromPhone';
import styles from './index.less';
import { query, post } from 'zero-element-antd/lib/utils/request';
import win from 'zero-element/lib/utils/window';
import { useModel } from 'zero-element/lib/Model';
import ZEle from 'zero-element';

const { Content } = Layout;
const cType = {
  'account': AccountForm,
  'mailReg': MailReg,
  'phoneReg': PhoneReg,
  'RFE': RFE,
  'RFP': RFP,
  'captchaLogin': CaptchaLigin
};

function LoginForm(props) {
  const [formType, setFormType] = useState('account');
  const [loading, setLoading] = useState(false);
  // 强制重置密码
  const [resetPassword, setResetPassword] = useState(false);
  const formRef = useRef();

  const [ redirectUrl, setRedirectUrl ] = useState('');

  const model = useModel('global');

  useEffect(_ => {
    new JParticles.particle('#loginBG', {
      color: '#25bfff',
      lineShape: 'cube',
      range: 2000,
      proximity: 100,
      // 开启视差效果
      // parallax: true,
    });
  }, []);

  //登录
  function handleSubmit(values) {
    setLoading(true);
    post('/api/sys/oauth/login', values, {
      message: null,
    }).then((data) => {
      saveToken({
        userName: data.name,
        token: data.accessToken,
        avatar: data.avatar,
        remember: values.remember,
        extra: values.account,
      });
      model.queryPerm(true);

      // if (data.status === 'PASS') {
      //   if (data.passwordIsEmpty === true) {
      //     setResetPassword(true);
      //   } else {
      //     handleRouteToHome(data);
      //   }
      // } else {
      //   if (data.status === 'PENDING_APPROVAL') {
      //     history.push('/login/pending');
      //   }
      //   if (data.status === 'REFUSE') {
      //     history.push('/login/refuse');
      //   }
      // }
      
      handleRouteToHome(data);

    })
      .finally(_ => {
        setLoading(false);
      });
  }

  function handleRouteToHome() {
    if (win.ZEle.indexPage) {
      history.push(win.ZEle.indexPage);
    } else {
      history.push('/');
    }
  }

  //注册
  function handleReg(values) {
    setLoading(true);
    post('/api/sys/oauth/register', values, {
      message: null,
    }).then(_ => {
      message.success('注册成功');
      handleChangeFormType('account');
      if (values.email) {
        handleSendVerificationEmail(values.email);
      }
    })
      .finally(_ => {
        setLoading(false);
      });
  }

  function handleChangeFormType(type) {
    setFormType(type);
    // this.props.form.resetFields();
  }

  function switchRePasswordForm() {
    handleChangeFormType('RFP')
  }

  function handleReFEmail(values) {
    setLoading(true);

    query('/api/pub/password/normal/sendResetEmail', values)
      .then(() => {
        message.success('重置邮件发送成功');
        if (values.email) {
          this.handleChangeFormType('account');
        }
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  function handleReFPhone(values) {
    setLoading(true);

    post('/api/sys/oauth/resetPassword', values)
      .then(() => {
        message.success('密码重置成功');
        if (values.phone) {
          this.handleChangeFormType('account');
        }
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  function handleCilckResetPW() {
    formRef.current.submit();
  }

  function handleResetPW() {
    const data = formRef.current.getFieldsValue();
    setLoading(true);
    post('/api/sys/oauth/resetPassword', data)
      .then(_ => {
        message.success('密码已重置');
        setResetPassword(false);
        handleRouteToHome();
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  //发送验证邮箱邮件
  function handleSendVerificationEmail(email) {
    query(`/api/sys/oauth/sendVerificationEmail?email=${email}`, {}
    )
  }

  function handleGithubLogin() {
    setLoading(true);
    query('/api/sys/oauth/github/url', {})
      .then((data) => {
        console.log('github data = ', data);
        setRedirectUrl(data)
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  const MatchC = cType[formType];

  return <>
    <div
      id="loginBG"
      className={styles.loginBG}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
    </div>
    <div className={styles.formContainer}>
      
      <div className={styles.logo}>登录标题</div>

      <MatchC
        {...props}
        className={styles.Form}
        onSubmit={handleSubmit}
        onReg={handleReg}
        onRePW={switchRePasswordForm}
        onReFEmial={handleReFEmail}
        onReFPhone={handleReFPhone}
        onCaptchaLogin={handleSubmit}
        loading={loading}
      />

      <div className={styles.options}>
      </div>


      <div className={styles.regGuided}>

        <Button type="link" size="small"
          onClick={() => handleGithubLogin()}
        >github登录</Button>
        {formType == 'account' ? (
          <>
            <Button type="link" size="small"
              onClick={handleChangeFormType.bind(null, 'githubLogin')}
            >验证码登录</Button>
          </>
        ) : null}
        {formType !== 'account' ? (
          <Button type="link" size="small"
            onClick={handleChangeFormType.bind(null, 'account')}
          >账号登录</Button>
        ) : null}
        {formType !== 'phoneReg' ? (
          <Button type="link" size="small"
            onClick={handleChangeFormType.bind(null, 'phoneReg')}
          >手机注册</Button>
        ) : null}
        {formType === 'phoneReg' ? (
          <Button type="link" size="small"
            onClick={handleChangeFormType.bind(null, 'mailReg')}
          >邮箱注册</Button>
        ) : null}

      </div>
    </div>
    <Modal
      title="重置密码以继续"
      visible={resetPassword}
      closable={false}
      maskClosable={false}
      keyboard={false}
      confirmLoading={loading}
      footer={<>
        <Button type="primary" onClick={handleCilckResetPW}>重置密码</Button>
      </>}
    >
      <ZEle
        namespace="resetPassword"
        config={resetPasswordConfig}
        footer={null}
        formRef={formRef}
        onSubmit={handleResetPW}
      />
    </Modal>
    {redirectUrl?<Route component={() => { window.location.href = `${redirectUrl}`; return null;} }/>:null}
  </>
}

export default (props) => {
  return <Layout>
    <Content>
      <LoginForm />
    </Content>
  </Layout>
}

const resetPasswordConfig = {
  title: '',
  items: [
    {
      component: 'Form',
      config: {
        goBack: false,
        API: {},
        fields: [
          {
            field: 'newPassword', label: '新密码', type: 'password',
            rules: ['required'],
          },
          {
            field: 'repeatpPassword', label: '重复新密码', type: 'password',
            rules: ['required', {
              type: 'password',
              field: 'newPassword',
            }],
            expect: {
              field: 'newPassword',
              value: 'IS_RESOLVE'
            }
          },
        ]
      }
    }
  ]
}