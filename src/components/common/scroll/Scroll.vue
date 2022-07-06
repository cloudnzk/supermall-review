<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
// import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);
// BScroll.use(ObserveDOM);

export default {
  name: "Scroll",
  mixins: [],
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,

      // 新版 better-scroll 提供的属性，解决不能滚动的问题
      // observeDOM: true,
      // observeImage: true

      // 根据业务场景指定，暴露一个props给外界来决定是否实时监听。对页面的性能有影响.
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    /* 2.监听滚动的位置 */
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 监听上拉加载更多
    if(this.pullUpLoad){
      this.scroll.on("pullingUp",() => {
        this.$emit('pullingUp')
      });
    }
  },
  destroyed() {},
  methods: {
    /* 快速滚动到某个位置，回到顶部使用 */
    scrollTo(x, y, delay = 300) {
      this.scroll && this.scroll.scrollTo(x, y, delay);
    },

    // 完成本次上拉加载
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },

    /* 判断scroll对象存不存在
    *  因为首页的数据有可能加载得很快，事件总线定义的事件很快触发，
    *  而此时 this.scroll 可能还没创建好
    */
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
};
</script>
<style scoped></style>
