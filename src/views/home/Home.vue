<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 吸顶显示效果：在这里放一个tabControl，默认不显示。等到滚动到一定位置就吸顶显示 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    >
    </tab-control>

    <!-- content 样式会被加到自定义组件的根div上 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <!-- <feature-view/> -->
      <!-- 子组件传给父组件的数据，在模板里不用再给监听的方法传参数。例如，tabClick(index)反而会出错 -->
      <tab-control
        class="tab-control"
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 监听一个组件的原生事件，需要加上 .native 修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";

import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
// import FeatureView from './childComps/FeatureView'

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce, throttle } from "common/utils";
import {itemListenerMixin} from "common/mixin"

export default {
  name: "Home",
  mixins: [itemListenerMixin],
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    // FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  props: {},
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      /* 保存商品数据的数据结构设计：保存页码和商品列表
        goods:{
          goodsType: {
            page: 0
            list: []
          }
        }
        */
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },

      currentType: "pop",
      isShowBackTop: false,
      // tabControl 的 offsetTop
      tabOffsetTop: 0,
      // tabControl 是否需要吸顶
      isTabFixed: false,

      // 保存首页的滚动位置
      saveY: 0,
      // itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  watch: {},
  created() {
    // 调用组件定义的方法时，必须使用this。不然使用的是引入的网络请求函数
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听图片加载的事件使用到了 this.$refs.scroll
    // 所以这部分代码最好放在 mounted 里面，不然 scroll 有可能为空

    // 使用 mixins 混入
    // this.imageLoad();
  },

  /* 使用 keep-alive 保存 Home 组件的状态 */
  // 重新激活 Home 组件时，滚动到原来的位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },

  /* 离开 Home 组件时，保存离开的位置 */
  deactivated() {
    //1.保存Y值
    this.saveY = this.$refs.scroll.getCurrentY();

    //2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  destroyed() {},
  methods: {
    /**
     * 网络请求相关的方法
     */
    /* 多封装一层，一般不在created()里面写具体实现 */
    async getHomeMultidata() {
      const res = await getHomeMultidata();
      // console.log(res);
      // 保存数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },

    // 请求商品数据的方法，每请求完1页将该页的数据加入列表，并递增页码
    async getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      const res = await getHomeGoods(type, page);

      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1;

      // 数据保存完成，完成上拉加载更多，允许下一次上拉加载
      // 上拉加载节流，3秒内最多一次上拉加载
      const finishPullUp = throttle(this.$refs.scroll.finishPullUp, 3000);
      finishPullUp();
      // this.$refs.scroll.finishPullUp()
    },

    /*
     * 事件监听相关的方法
     */
    tabClick(index) {
      if (index === 0) this.currentType = "pop";
      else if (index === 1) this.currentType = "new";
      else this.currentType = "sell";

      //让两个 tabControl 点击的位置同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    // 监听页面滚动
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      // 决定 tabControl 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 监听图片加载完成
    imageLoad() {
      // 刷新防抖
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      // 对监听器进行保存
      this.itemImgListener = () => {
        refresh();
      };
      this.$bus.$on("itemImageLoad", this.itemImgListener);
      // 取消监听器
      // this.$bus.$off("itemImageLoad", this.itemImgListener);
    },

    // 监听轮播图加载完成
    swiperImageLoad() {
      // 2.获取 tabControl 的 offsetTop，滚动到多少时就吸顶
      // 但图片没加载完成的时候，offsetTop 计算不正确
      // 所有的组件都有一个属性 $el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*
  * 在使用浏览器原生滚动时，为了让导航不跟随一起滚动。但这样会使 Navbar 脱标，后面跟着的元素会滚动到 Navbar 处
  * 因此，使用 better-scroll 后限制滚动范围后，没必要再使用 fixed 定位的方式
  */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 44px - 49px); */
}
</style>
