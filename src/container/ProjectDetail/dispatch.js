

export default function reducer(state, action) {
  const { type, payload = {} } = action;

  const typeMap = {
    loadStart() {
      return {
        ...state,
        loading: true,
      }
    },
    initData() {
      const {
        name, columns = [],
        createFormId = null, updateFormId = null, detailFormId = null,
        pageType,
      } = payload;
      return {
        ...state,
        pageName: name,
        columns: columns.map(item => {
          const { id, field, label, options = {}, ...rest } = item;
          return {
            ...rest,
            id: field,
            dataIndex: field,
            title: label,
            options,
          }
        }),
        createFormId,
        updateFormId,
        detailFormId,
        pageType,
        loading: false,
      }
    },
    selectTreeNode() {
      return {
        ...state,
        treeNodeData: payload,
        columns: [],
        createFormId: null,
        updateFormId: null,
      }
    },
    apiModalVisible() {
      return {
        ...state,
        visible: !state.visible,
      }
    },
    defaults() {
      return state;
    }
  };

  return (typeMap[type] || typeMap[type])();
}