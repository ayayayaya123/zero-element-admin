import React, { useState, useEffect, useRef } from 'react';
import { TreeSelect, Spin } from 'antd';
import { query } from 'zero-element/lib/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

export default function TreeSelectFetch(props) {
  const {
    name,
    className,
    value,
    options,
    namespace,
    onChange,
    handle = {},
    formdata = {},
    hooks = {},
    props: pProps,
    ...rest
  } = props;
  console.log('options = ', options)
  const {
    API = '', dataField = 'data',
    label: optLabel = 'label', value: optValue = 'value',
    saveData,
    effectField,
  } = options;

  // const { onFormFieldMap } = hooks;
  // const { onSaveOtherValue } = handle;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const initRef = useRef(false);
  const effectFieldValue = formdata[effectField];

  console.log('optionList = ', optionList)

  useWillMount(_ => {
    if (effectField === undefined) {
      getData();
    }
  });
  useEffect(_ => {
    if (effectFieldValue) {
      if (initRef.current) {
        handleChange();
      }
      getData();
    }
  }, [effectFieldValue]);
  useEffect(_ => {
    handleChange(value);
  }, [optionList])

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
        data: formdata,
      });
      setLoading(true);
      query(fAPI)
        .then(data => {
          const list = Array.isArray(data) ?
            data
            : data[dataField].data;

          if (Array.isArray(list)) {
            const formatList = formatDataList(list);
            setOptionList(formatList);
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
        })
        .finally(_ => {
          setLoading(false);
          initRef.current = true;
        })
    }
  }

  function handleChange(value) {
    onChange({
      target: {
        value,
      }
    });

    const find = optionList.find(i => i[optValue] === value);

    if (saveData) {
      console.log('saveData = ', saveData)
      if (find) {
        Object.keys(saveData).forEach(key => {
          onSaveOtherValue(key, find[saveData[key]]);
        });
      } else {
        console.log(`未能找到 ${optValue} 为 ${value} 的数据, saveData 选项无法生效`);
      }
    }
    if (typeof onFormFieldMap === 'function') {
      onFormFieldMap(name, find)
        .then(data => {
          const rst = {};
          Object.keys(data).forEach(key => {
            rst[key] = data[key];
          });
          onSaveOtherValue(rst);
        })
    }
  }

  const [ valueData, setValueData ] = useState(false);

  //数据处理
  function formatDataList(list){
    const treeList = [];
    list.map((item, id) =>{
      const treeItem = {};
      treeItem.title = item.name;
      treeItem.value = item.typeId ? item.typeId : item.id;
      treeItem.key = item.id;
      if(Array.isArray(item.children)){
        treeItem.children = formatData(item.children)
      }
      treeList.push(treeItem);
    })
    return treeList;
  }

  function onChangeValue(value) {
    console.log(value);
    setValueData(value);
    handleChange(value)
  };


  return <Spin className={className} spinning={loading}>
    <TreeSelect
        style={{ width: '100%' }}
        value={valueData}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={optionList ? optionList : []}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={onChangeValue}
      />
  </Spin>
}