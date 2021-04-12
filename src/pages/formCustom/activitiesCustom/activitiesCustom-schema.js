import React from 'react';
import { PageHeader } from 'antd';

import useBreadcrumb from '@/framework/useBreadcrumb';
import SchemaGeneratorPage from '@/components/SchemaGeneratorPage';

import { getPageData } from 'zero-element/lib/Model';
    
export default function SchemaGenerator (props) {

    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '自定义表单', path: '/formCustom' },
        { title: '自定义表单', path: '/formCustom/activitiesCustom' },
        { title: '可视化设计' },
    ]);


    const { location } = props;
    const { query } = location;
    const { ns } = query;
    let formData = '';
    if(getPageData(ns)){
        formData = getPageData(ns).formData;
    }else{
        window.history.back();
    }

    const ps = {
        namespace: ns,
        subData: formData,
    }

    return (
        <PageHeader
        title="可视化设计"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <SchemaGeneratorPage {...ps}/>
    </PageHeader>
    )
} 