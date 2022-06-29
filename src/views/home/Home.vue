<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name:'',
    mixins: [],
    components: {
      NavBar,
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
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
