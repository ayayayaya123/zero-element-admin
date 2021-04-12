import React from 'react';
import ProjectActivities from '@/pages/workFlowManageFR/activitiesFR/config/ActivitiesFR/design';

import useBreadcrumb from '@/framework/useBreadcrumb';
    
export default (props) => {

    useBreadcrumb([
        { title: '首页', path: '/' },
        { title: '流程管理', path: '/workFlowManageFR' },
        { title: '表单管理', path: '/workFlowManageFR/activitiesFR' },
        { title: '可视化设计' },
    ]);

    return (
        <ProjectActivities />
    )
}