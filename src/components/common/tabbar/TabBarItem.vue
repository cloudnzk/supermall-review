<template>
  <!-- 注意：上面不要再加一个 div 标签了，否则 tabbar 上设置的 flex 不对这里的items生效 -->
  <!-- 整2个具名插槽，一个放图标，一个放文本 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name = "item-icon"></slot></div>
    <div v-else><slot name = "item-icon-active"></slot></div>
    <!-- 最好是在插槽外面再包装一层 div，这样可以保证在插槽被替换时，添加在上面的样式属性不被替换掉 -->
    <!-- <div :class="{active: isActive}"><slot name = "icon-text"></slot></div> -->
    <div :style="activeStyle"><slot name = "icon-text"></slot></div>
  </div>
</template>
<script>
  export default {
    name:'TabBarItem',
    mixins: [],
    components: {},
    props:{
      // props是组件标签上自定义的 attribute 属性
      // 父子组件通信，父传子用到 props
      // 这里是将每个 items 的路径传过来，然后跳转到特定的链接
      path: String,
      activeColor: {
        type: String,
        default: 'red',
      }
    },
    data () {
      return {

      };
    },
    computed: {
      // 拿到当前活跃路由的 path，看是否包含 TabBarItem 的 path
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },

      // 颜色动态控制
      // 动态绑定 style，如果逻辑比较复杂，可以放到一个计算属性里面
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      itemClick(){
        // replace 和 push 的区别：replace 不保存 history
        this.$router.replace(this.path)
      }
    },
  }
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /* 这里的颜色不要写死，最好可以让人在 template 中动态决定，像你用 vant 的组件库一样 */
  /* .active{
    color: red;
  } */
</style>
