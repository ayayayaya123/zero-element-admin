import React from 'react';
import { Button } from 'antd';
import { history, withRouter } from 'umi';

function ActionOnPath(props) {
  const { namespace, title, options, className, location } = props;
  const { query = {} } = options;

  function handleClick() {
    const data = {};
    const targetData = {
      ...location.query,
      namespace,
    };

    Object.keys(query).forEach(toKey => {
      const formKey = query[toKey];
      data[toKey] = targetData[formKey] || formKey;
    });
    history.push({
      pathname: options.path,
      query: data,
    });
  }

  return <>
    <Button onClick={handleClick} className={className}>
      {title}
    </Button>
  </>
}

export default withRouter(ActionOnPath);