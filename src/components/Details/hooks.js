import { useModel, setPageData, clearPageData } from 'zero-element/lib/Model';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { query } from '@/../zero-antd-dep/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useState, useRef } from 'react';

/**
 * 获取详情数据
 *
 * @export
 * @param {string} namespace
 * @param {string} API
 * @returns [detailsData, loading]
 */
export default function useDetails(namespace, API) {
  const model = useModel({
    namespace,
  });
  const { detailData = {} } = model;
  const [loading, setLoading] = useState(false);
  const countRef = useRef(0);

  useDidMount(getData);
  useWillUnmount(clearData);

  function getData() {
    if (API) {
      setLoading(true);
      query(formatAPI(API, { namespace }))
        .then(data => {
          countRef.current += 1;
          const saveData = {
            ...data,
            _count: countRef.current,
          };
          model.save('detailData', saveData);
          setPageData(namespace, 'detailData', saveData);
        })
        .finally(_ => {
          setLoading(false);
        })
    }
  }
  function clearData() {
    model.save('detailData', {});
    clearPageData(namespace, 'detailData');
  }

  return [
    detailData,
    loading,
    getData,
  ]
}