import { PageHeader } from 'antd';
import React from 'react';
import ZEle from 'zero-element';
import config from './config/myApply-edit';

import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function WorkFlowListApply() {

    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '审核', path: '/userAudit' },
        { title: '我的申请', path: '/userAudit/myApply' },
        { title: '查看详情' },
    ]);
    useWillUnmount(switchEndpoint)

    return <PageHeader
        title="查看详情"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <ZEle namespace="myApply_edit" config={config} />
    </PageHeader>
};