
/**
 * 
 * @param {array} data 
 * @param {number} id 
 */
export default function (data, id) {
  const stack = [...data];
  let rst = {};

  while (stack.length) {
    const menu = stack.shift();
    if (Array.isArray(menu.children)) {
      stack.push(...menu.children);
    }

    if (menu.id === id) {
      rst = menu;
    }
  }

  return rst;

}