<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
  </div>
</template>
<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';

  import {getDetail} from 'network/detail'
  export default {
    name:'Detail',
    mixins: [],
    components: {
      DetailNavBar,
      DetailSwiper,
    },
    props:{},
    data () {
      return {
        iid: null,
        topImages: [],
      };
    },
    computed: {},
    watch: {},
    created() {
      // 从路由中获取参数：iid
      this.iid = this.$route.params.iid

      this.getDetail(this.iid)
    },
    mounted() {},
    destroyed() {},
    methods: {
      async getDetail(iid){
        const res = await getDetail(iid)
        // 1.获取顶部轮播图
        const data = res.result
        this.topImages = data.itemInfo.topImages;
      }
    },
  }
</script>
<style scoped>

</style>
