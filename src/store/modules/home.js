const home = {
  state: {
    navMenu: [
      {label: '首页',target: '/'},
      {label: '测试', target: 'system'}
    ],
    searchDesc: [{
      label: '活动性质', //名称
      status: 'radio', //组件类别
      model: 'nature', //对应v-model
      value: [{
        label: '不限',
        value: 'all'
      }, {
        label: '免费',
        value: 'free'
      }, {
        label: '收费',
        value: 'charge'
      }]
    }, {
      label: '活动状态',
      status: 'checkbox',
      model: 'state',
      value: [{
        label: '进行中',
        value: 'going',
      }, {
        label: '已过期',
        value: 'outTime'
      }, {
        label: '报名已满',
        value: 'full'
      }]
    }]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    searchDesc: state => state.searchDesc,
  }
}

export default home
