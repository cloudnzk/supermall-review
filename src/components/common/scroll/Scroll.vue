<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
BScroll.use(ObserveDOM);

export default {
  name: "Scroll",
  mixins: [],
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0,
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
      observeDOM: true,
      // observeImage: true
      // 根据业务场景指定，暴露一个props给外界来决定是否实时监听。对页面的性能有影响.
      probeType: this.probeType,
    });

    /* 2.监听滚动的位置 */
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
  },
  destroyed() {},
  methods: {
    /* 快速滚动到某个位置，回到顶部使用 */
    scrollTo(x, y, delay = 300) {
      this.scroll.scrollTo(x, y, delay);
    },
  },
};
</script>
<style scoped></style>
