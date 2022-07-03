<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <!-- <feature-view/> -->
    <tab-control :titles="titles" />
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from '../../components/content/tabControl/TabControl'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  // import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata} from 'network/home'
  export default {
    name:'',
    mixins: [],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      // FeatureView,
      TabControl,
    },
    props:{},
    data () {
      return {
        banners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        /* 保存商品数据的数据结构设计：保存页码和商品列表
        goods:{
          goodsType: {
            page: 0
            list: []
          }
        }
        */
        goods: {
          'pop': {page: 0, list:[]},
          'news': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        }
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
