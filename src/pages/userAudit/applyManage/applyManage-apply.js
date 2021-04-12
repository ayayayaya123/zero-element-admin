import React from 'react';
import { PageHeader } from 'antd';
import ZEle from 'zero-element';
import config from './config/applyManage-apply/config';

import useBreadcrumb from '@/framework/useBreadcrumb';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import switchEndpoint from '@/components/switchEndpoint';

export default function WorkFlowListApply() {

    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '流程管理', path: '/workFlowManage' },
        { title: '审核管理', path: '/workFlowManage/applyManage' },
        { title: '发起申请' },
    ]);
    useWillUnmount(switchEndpoint)

    return <PageHeader
        title="发起申请"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <ZEle namespace="applyManage_apply" config={config} />
    </PageHeader>
};
