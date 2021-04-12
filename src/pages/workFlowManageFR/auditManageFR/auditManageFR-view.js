import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/auditManageFR-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="auditManageFR_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
