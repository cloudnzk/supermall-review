<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
  export default {
    name:'TabBar',
    mixins: [],
    components: {},
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
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  }
</style>
