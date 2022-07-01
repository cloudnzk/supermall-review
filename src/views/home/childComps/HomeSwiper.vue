<template>
  <div class="slide">
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="item in banners" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css';

  export default {
    name:'',
    mixins: [],
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      banners:{
        type: Array,
        // 设置默认值时要写成一个函数
        default(){
          return []
        } ,
      }
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          // effect: 'fade',
          pagination: {
            el: '.swiper-pagination-white',
            dynamicBullets: true,
          }
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true
          // }
        }
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      //  onSlideChange(){
      //     console.log('111');
      //  }
    },
  }
</script>
<style scoped>
  .slide{
    width: 100%;
  }

  .slide img{
    width: 100%;
  }
</style>
