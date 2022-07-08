<template>
  <div class="bottom-menu">
    <CheckButton
      class="select-all"
      @checkBtnClick="checkBtnClick"
      v-model="isSelectAll"
      :is-checked="isSelectAll"
    ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="calcClick"
      >去计算({{ $store.getters.cartLength }})</span
    >
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    // 计算总价格。计算属性是响应式的，所以取消选中可以实时更新总价格
    totalPrice() {
      const cartList = this.$store.getters.cartList;
      return cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          //累加器
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    isSelectAll: function () {
      if (this.$store.getters.cartLength === 0) return false;
      return !this.$store.getters.cartList.find((item) => item.checked === false)
    },
  },
  methods: {
    checkBtnClick: function () {
      // 2.如果有未选中的内容, 则全部选中
      if (this.isSelectAll) {
        //全部选中
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        //部分选中
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择需要购买的商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
