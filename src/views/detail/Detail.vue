<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll" :probe-type="3">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo" />
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../components/common/scroll/Scroll";

import GoodList from 'components/content/goods/GoodsList'

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
import {itemListenerMixin} from "common/mixin"
export default {
  name: "Detail",
  mixins: [itemListenerMixin],
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
    this.getRecommend()
  },
  mounted() {},
  // 为什么这里不能在 deactivated 里取消事件？因为详情页没有缓存，方法无效
  destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
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
      if (data.rate.cRate){
          this.commentInfo = data.rate.list[0]
      }
    },

    async getRecommend(){
      const res = await getRecommend()
      this.recommends = res.data.list
    },

    /**
     * 事件监听相关方法
     */
    imageLoad() {
      this.$refs.scroll.refresh();
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
  height: calc(100% - 44px);
}
</style>
