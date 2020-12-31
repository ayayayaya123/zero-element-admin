import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/masterResource-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="masterResource_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
