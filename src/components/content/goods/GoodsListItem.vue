<template>
  <div class="goods-item">
    <img
      v-lazyload="showImg"
      alt=""
      @load="imageLoad"
      @click="itemClick"
    />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  mixins: [],
  components: {},
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    // this.goodsItem.show.img  首页图片
    // this.goodsItem.image 详情页图片
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 监听图片加载完成，通过事件总线发送事件。目的是让 Home 组件监听
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },

    // 点击跳转到详情页
    itemClick() {
      this.$router.push(`/detail/${this.goodsItem.iid}`);
    },
  },
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
