import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

// import FastClick from 'fastclick'

import VueLazyload from 'vue-lazyload'
// import './assets/css/index.css'
// import './assets/tailwind.css'

Vue.config.productionTip = false

/* 非父子组件通信：事件总线 */
// 事件总线怎么使用？在 Vue 的原型上添加一个 $bus 属性
// 属性的值是一个 Vue 实例，因为 Vue 实例里默认实现了 $emit 方法和监听事件的方法
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// fastclick 解决 300ms 延迟
// 其实现在的浏览器解决了这个问题，而且 fastclick 很久不更新了。所以没有必要使用了
// FastClick.attach(document.body);

// 安装懒加载插件
Vue.use(VueLazyload, {
  // 在JS中怎么导入图片？require或者import
  loading: require('./assets/img/common/placeholder.png')
})

Vue.directive("lazyload", {
  // 指令的定义
  bind: function (el, binding) {
    let lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let lazyImage = entry.target;
        // 相交率，默认是相对于浏览器视窗
        if (entry.intersectionRatio > 0) {
          lazyImage.src = binding.value;
          // 当前图片加载完之后需要去掉监听
          lazyImageObserver.unobserve(lazyImage);
        }
      })
    })
    lazyImageObserver.observe(el);
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
