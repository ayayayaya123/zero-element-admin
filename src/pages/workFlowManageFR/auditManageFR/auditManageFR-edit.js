import { PageHeader } from 'antd';
import React from 'react';
import ZEle from 'zero-element';
import config from './config/auditManageFR-edit';

import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function WorkFlowListApply() {

    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '流程管理', path: '/workFlowManageFR' },
        { title: '审核管理', path: '/workFlowManageFR/auditManageFR' },
        { title: '查看详情' },
    ]);
    useWillUnmount(switchEndpoint)

    return <PageHeader
        title="查看详情"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <ZEle namespace="auditManageFR_edit" config={config} />
    </PageHeader>
};