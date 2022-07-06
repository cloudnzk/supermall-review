import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './assets/css/index.css'
// import './assets/tailwind.css'

Vue.config.productionTip = false

/* 非父子组件通信：事件总线 */
// 事件总线怎么使用？在 Vue 的原型上添加一个 $bus 属性
// 属性的值是一个 Vue 实例，因为 Vue 实例里默认实现了 $emit 方法和监听事件的方法
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
