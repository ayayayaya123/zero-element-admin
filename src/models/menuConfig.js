/* eslint-disable no-unused-vars */

import { createModel } from 'zero-element/lib/Model';
import { query, post, update, remove } from 'zero-element/lib/utils/request';
import { getToken } from 'zero-element/lib/utils/request/token';
import { LS } from 'zero-element/lib/utils/storage';

const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));

createModel({
  namespace: 'menuConfig',
  state: {
    menuTree: null,
    firstRequestCount: 0
  },
  effects: {
    setMenuTree(tree) {
      this.menuTree = arrayFlat(tree);
    },
    setFirstRequestCount(value){
      this.firstRequestCount = value;
    },
    getFirstRequestCount(){
      return this.firstRequestCount;
    },
    clearMenuTree() {
      this.menuTree = null;
    },
    queryPerm: async function () {
      if (getToken()) {
        if(this.getFirstRequestCount() >= 1){
          return;
        }
        if (!this.menuTree || Array.isArray(this.menuTree)) {
          LS.del('menuList');
          query('/api/crud/menu/custom/json')
            .then(response => {
              if (response.status === 200) {
                const { data } = response.data;
                LS.set('menuList', data);
                this.setFirstRequestCount(this.getFirstRequestCount()+1);
                this.setMenuTree(data);
              }
            })
            .catch(_ => {
              return sleep(5000).then(_ => {
                this.clearMenuTree();
              })
            })
        }
      } else {
        sleep(5000).then(_ => {
          this.clearMenuTree();
        })
      }
    },
    getMenuTree() {
      if (!this.menuTree || !Array.isArray(this.menuTree)) {
        return {};
      }
      return this.menuTree;
    }
  },
  useDefault: false,
});

function arrayFlat(arr) {
  const stack = [...arr];
  const rst = [];

  while (stack.length) {
    const item = stack.shift();
    if (Array.isArray(item.perms)) {
      stack.push(...item.perms);
    }
    rst.push(item);
  }

  return rst;
}