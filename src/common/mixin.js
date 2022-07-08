// 使用混入来复用代码

import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    // console.log('打印内容')
    //1.图片加载完成的事件监听
    const newRefresh = debounce(this.$refs.scroll.refresh, 500)

    // 对监听的事件进行保存,便于取消.
    // 取消的目的是在详情页加载 GoodList 时，不刷新 Home 页
    this.itemImgListener = () => {
      newRefresh()
    }
    //监听 item 中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)

  },
}

// 返回顶部的混入封装
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  },
}
