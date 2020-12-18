import React from 'react';
import DetailsTemplate from '@/components/Details/DetailsTemplate';
import setting from './config/test-setting';
    
export default () => {

  return <DetailsTemplate
    namespace="test_view"
    setting={setting}
    config={setting.viewConfig}
  />
}
    
