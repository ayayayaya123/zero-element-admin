import React from 'react';
import { PageHeader } from 'antd';
import BodyPage from './config/workFlowListFR-step';

import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function WorkFlowListFRStep() {
    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '流程管理FR', path: '/workFlowListFR' },
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
