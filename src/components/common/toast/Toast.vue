<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data () {
   return {
       message: '',
       isShow: false
   }
  },
  props: {
    //   message: {
    //       type: String,
    //       default(){
    //           return ""
    //       }
    //   },
    //   isShow: {
    //       type: Boolean,
    //       default(){
    //           return false
    //       }
    //   }
  },
  methods:{
      show(message, duration){
          this.isShow = true
          this.message = message

          setTimeout(() => {
              this.isShow = false;
              this.message = ''
          }, duration);
      }
  }
}
</script>
<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 999;
        
        /* 居中的代码 */
        transform: translate(-50%,-50%);
        padding: 8px 10px;

        color: #fff;
        background-color: rgba(0,0,.75);
    }
</style>