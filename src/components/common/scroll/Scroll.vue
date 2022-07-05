<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from "@better-scroll/core";
  export default {
    name:'Scroll',
    mixins: [],
    components: {},
    props:{},
    data () {
      return {
        scroll: null
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        // 新版 better-scroll 提供的属性，解决不能滚动的问题
        observeDOM: true
      })
    },
    destroyed() {},
    methods: {},
  }
</script>
<style scoped>

</style>
