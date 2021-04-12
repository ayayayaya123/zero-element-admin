import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { history } from 'umi';
import Generator from 'fr-generator';
import copyTOClipboard from 'copy-text-to-clipboard';

import { defaultSettings, defaultCommonSettings, defaultGlobalSettings } from './settings';

import { setPageData, getPageData, clearPageData, getHooks } from 'zero-element/lib/Model';

import promiseAjax from '@/utils/promiseAjax';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';

import { widgets as customWidgets } from './components';

// const defaultValue = {
//   schema: {
//     type: 'object',
//     properties: {
//       inputName: {
//         title: '简单输入框',
//         type: 'string',
//       },
//     },
//   },
//   displayType: 'row',
//   showDescIcon: true,
//   labelWidth: 120,
// };
const templates = [
  {
    text: '模板1',
    name: 'something',
    schema: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        inputName: {
          title: '简单输入框',
          type: 'string',
        },
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        dateName: {
          title: '时间选择',
          type: 'string',
          format: 'date',
        },
      },
    },
  },

];

const Demo = (props) => {

  const { subData } = props;

  const { API, custActivityId } = subData;

  // const [submitData, setSubmitData] = useState('');

  // useEffect(_ => {
  //   setSubmitData(subData);
  // }, [submitData])

  function createFR(submitData) {
    const apiUrl = `${getEndpoint()}${API.createAPI}`
    const queryData = submitData;
    handleRequest(apiUrl, queryData, { method: 'POST' })
  }

  function updateFR(submitData) {
    const updateAPI = API.updateAPI;
    const formatApi = updateAPI.replace('(id)', custActivityId);
    const apiUrl = `${getEndpoint()}${formatApi}`
    const queryData = submitData;
    console.log('queryData = ', queryData)
    handleRequest(apiUrl, queryData, { method: 'PUT' })
  }

  function handleRequest(apiUrl, queryData, other) {
    promiseAjax(apiUrl, queryData, other)
      .then(resp => {
        if (resp && resp.code === 200) {
          console.log("保存成功")
          history.push(goBack());
        } else {
          console.warn('保存失败 = ', resp.message);
        }
      })
  }

  function onSubimit(schema) {
    if (validateSchema(schema)) {
      if (API.createAPI) {
        subData.tableJson = schema;
        createFR(subData);
      } else if (API.updateAPI) {
        subData.tableJson = schema;
        updateFR(subData);
      }
    }
  }

  //properties
  function validateSchema(schema) {
    const schemaJson = strToJson(schema);
    if (schemaJson && JSON.stringify(schemaJson) != '{}') {
      const propertiesJSon = schemaJson.schema.properties;
      if (JSON.stringify(propertiesJSon) != '{}') {
        for (var index in propertiesJSon) {
          // console.log(index ,":", propertiesJSon[index]);
          if (index == '') {
            message.error(`标题为 ${propertiesJSon[index].title} 的组件配置, ID 不能为空`);
            return false;
          }
        }
      }
    }
    return true;
  }

  const customBtns = [
    true, true, false, true,
    {
      text: '保存',
      saveClick: (schema) => {
        // copyTOClipboard(schema);
        // submitData.frJson = strToJson(schema);
        // setSubmitData(submitData);
        // console.log(schema);
        // alert("复制成功")
        // console.log('submitData = ', submitData)
        // setPageData(namespace, 'formData', submitData);
        onSubimit(schema)
      },
    },
  ]

  //字符串 转 json
  function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
  }

  function goBack(){
    const pathname = location.pathname;
    const pathList = pathname.split('/');
    let goBackUrl = '';
    if(pathList){
      if(pathList.length == 3){
        goBackUrl = `/${pathList[1]}`
      }else if(pathList.length > 3){
        goBackUrl = `/${pathList[1]}/${pathList[2]}`;
      }
    }
    return goBackUrl;
  }

  return (
    <div style={{ height: '100vh' }}>
      <Generator
        defaultValue={subData.tableJson ? (strToJson(subData.tableJson)) : null}
        widgets={customWidgets}
        settings={defaultSettings}
        commonSettings={defaultCommonSettings}
        globalSettings={defaultGlobalSettings}
        extraButtons={customBtns} />
    </div>
  );
};
export default Demo;