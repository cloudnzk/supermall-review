<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="deepPink">
        <img slot="item-icon" src="~/assets/img/tabbar/home.svg" alt=""/>
        <img slot="item-icon-active" src="~/assets/img/tabbar/home_active.svg" alt=""/>
        <div slot="icon-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~/assets/img/tabbar/category.svg" alt=""/>
        <img slot="item-icon-active" src="~/assets/img/tabbar/category_active.svg" alt=""/>
        <div slot="icon-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~/assets/img/tabbar/shopcart.svg" alt=""/>
        <img slot="item-icon-active" src="~/assets/img/tabbar/shopcart_active.svg" alt=""/>
        <div slot="icon-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~/assets/img/tabbar/profile.svg" alt=""/>
        <img slot="item-icon-active" src="~/assets/img/tabbar/profile_active.svg" alt=""/>
        <div slot="icon-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
  import TabBarItem from '../../common/tabbar/TabBarItem';
  import TabBar from '../../common/tabbar/TabBar';

  export default {
    name:'',
    mixins: [],
    components: {
      TabBar,
      TabBarItem,
    },
    props:{},
    data () {
      return {

      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {},
  }
</script>
<style scoped>

</style>
