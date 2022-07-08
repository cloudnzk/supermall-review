<template>
  <swiper class="detail-swiper" :options="swiperOption">
    <swiper-slide v-for="item in topImages" :key="item">
      <img :src="item" alt="" />
    </swiper-slide>
    <div
      class="swiper-pagination swiper-pagination-white"
      slot="pagination"
    ></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        // effect: 'fade',
        pagination: {
          el: ".swiper-pagination-white",
          dynamicBullets: true,
        },
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // }
      },
    };
  },
  methods: {},
};
</script>
<style scoped>

.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
