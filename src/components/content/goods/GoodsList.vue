<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :goods-item="item" :key="item.iid"></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodList",
  mixins: [],
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>
