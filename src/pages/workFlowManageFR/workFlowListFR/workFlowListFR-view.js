import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/workFlowListFR-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="workFlowListFR_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
