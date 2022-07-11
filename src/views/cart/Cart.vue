<template>
  <div id="cart">
    <nav-bar class="nav-bar"
      ><div slot="center">购物车({{ cartLength }})</div></nav-bar
    >
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar,
  },
  computed: {
    //将 store 中的 getter 映射到局部计算属性：
    ...mapGetters(["cartList", "cartLength"]),

    // ...mapGetters({
    //   cartList: "cartList",
    //   cartCount: "cartLength",
    // }),

    // cartList() {
    //   return this.$store.getters.cartList
    // },
    // cartCount() {
    //   return this.$store.getters.cartLength
    // }
  },
};
</script>

<style scoped>
#cart {
  /* position: relative; */
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>
