import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/testField-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="testField_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
