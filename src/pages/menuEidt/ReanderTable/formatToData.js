
/**
 * 
 * @param {array} menuData 
 * @param {boolean} init 初始化 id
 */

let id = 0;
export default function formatToData(menuData, init = true, pid) {
  const rst = [];
  if (init) {
    id = 0;
  }
  if (Array.isArray(menuData)) {
    menuData.forEach(item => {
      const { items, children, ...rest } = item;
      const newId = id++;
      rst.push({
        ...rest,
        id: newId,
        pid,
        children: formatToData(items || children, false, newId),
      });
    })
  }
  return rst;
}