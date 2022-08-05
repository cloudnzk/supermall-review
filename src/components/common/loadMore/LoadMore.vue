<template>
  <div class="loading" ref="loading">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name:'LoadMore',
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
    mounted() {
      this.loading()
    },
    destroyed() {},
    methods: {
      loading(){
        const loadDiv = this.$refs.loading;
        let observer =  new IntersectionObserver( entries => {
          let entry = entries[0]
          if(entry.intersectionRatio > 0){
            this.$emit("loadMore")
          }
        })
        observer.observe(loadDiv)
      }
    },
  }
</script>
<style scoped>

</style>
