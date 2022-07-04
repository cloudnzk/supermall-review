<template>
  <div class="tab-control">
    <div v-for="item,index in titles" :key="item"
    class="tab-control-item"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    // 接收 tab 的标题：['流行','新款','精选']
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    itemClick(index){
      this.currentIndex = index

      // 父子组件通信之子传父，将数据传到 Home 组件
      // 第一个参数：自定义事件名，第二个参数：要传递的数据
      this.$emit('tabClick', this.currentIndex)
    }
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
