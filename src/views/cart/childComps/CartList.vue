<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  activated() {
    // 不能滚动的原因主要是高度没刷新
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
