<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>
<script>
import Scroll from "../../components/common/scroll/Scroll";

import GoodList from "components/content/goods/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
  },
  props: {},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // 商品、参数、评论和推荐的 offsetTop
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    // 从路由中获取参数：iid
    this.iid = this.$route.params.iid;

    // 商品信息
    this.getDetail(this.iid);

    // 详情页推荐信息
    this.getRecommend();
  },
  mounted() {},
  // 为什么这里不能在 deactivated 里取消事件？因为详情页没有缓存，方法无效
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),

    async getDetail(iid) {
      const res = await getDetail(iid);
      // console.log(res)
      // 1.获取顶部轮播图
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取商品的参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0];
      }

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        //   console.log(this.themeTopYs);
      }, 100);
    },

    async getRecommend() {
      const res = await getRecommend();
      this.recommends = res.data.list;
    },

    /**
     * 事件监听相关方法
     */

    // 等所有的图片都加载好即触发回调
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },

    // 点击标题滚到对应内容
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },

    // 滚动内容显示对应标题
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY 和主题中的 offsetTop 值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        // 条件一：防止赋值的过程过于频繁；条件二：判断区间
        // if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])){
        // 简化判断，在数组多添加一个大的数，避免数组越界
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // console.log(i);
          this.currentIndex = i;
          // 传递到 NavBar 组件中
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3.返回顶部显示
      this.listenShowBackTop(position);
    },

    // 添加到购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

      // 2.添加到 Vuex 中
      // this.$store.commit('addCart', product)

      // 分发 Action
      // this.$store.dispatch('addCart', product)
      // mapActions 映射到组件的方法上
      this.addCart(product).then(res =>{
        // console.log(res);
        this.$toast.show(res,1500)
      })
    },
  },
};
</script>
<style scoped>
#detail {
  /* 隐藏掉下面的tabbar，因为tabbar是固定定位，已经脱离了标准流 */
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 给滚动区域的父元素设置具体高度，否则是根据内容撑开 */
  height: 100vh;
}
.detail-nav {
  /* 如果可以用相对定位，尽量用。因为相对定位会保持在原来的位置，不脱标 */
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* position: absolute;
  top: 44px;
  bottom: 58px; */
  /* 使用 100% 必须给父元素设置高度 */
  height: calc(100% - 44px - 58px);
}
</style>
