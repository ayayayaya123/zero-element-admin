import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/workFlowTypeFR-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="workFlowTypeFR_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
