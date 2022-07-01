<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from 'views/home/childComps/HomeSwiper'
  import RecommendView from 'views/home/childComps/RecommendView'

  import {getHomeMultidata} from 'network/home'
  export default {
    name:'',
    mixins: [],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
    },
    props:{},
    data () {
      return {
        banners: [],
        recommends: [],
      };
    },
    computed: {},
    watch: {},
    created() {
      this.getHomeMultidata()
    },
    mounted() {},
    destroyed() {},
    methods: {
      /**
       * 网络请求相关的方法
       */
      /* 多封装一层，一般不在created()里面写具体实现 */
      async getHomeMultidata(){
        const res = await getHomeMultidata()
        console.log(res);
        // 保存数据
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }
    },
  }
</script>
<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
