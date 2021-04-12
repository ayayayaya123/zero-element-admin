import React from 'react';
import { PageHeader } from 'antd';
import BodyPage from './config/applyManage-step';

import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function workFlowListStep() {
    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '流程管理', path: '/workFlowManage' },
        { title: '发起申请', path: '/workFlowManage/applyManage' },
        { title: '流程步骤' },
    ]);
    useWillUnmount(switchEndpoint)

    return <PageHeader
        title="流程步骤"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <BodyPage/>
    </PageHeader>
};
