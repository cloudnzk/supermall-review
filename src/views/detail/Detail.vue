<template>
  <div>
    详情页{{iid}}
  </div>
</template>
<script>
  export default {
    name:'Detail',
    mixins: [],
    components: {},
    props:{},
    data () {
      return {
        iid: null
      };
    },
    computed: {},
    watch: {},
    created() {
      // 从路由中获取参数：iid
      this.iid = this.$route.params.iid
    },
    mounted() {},
    destroyed() {},
    methods: {},
  }
</script>
<style scoped>

</style>
