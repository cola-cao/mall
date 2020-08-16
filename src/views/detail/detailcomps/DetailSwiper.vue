<template>
 <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImage" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>

import { Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  data() {
    return {
    
    }
  },
  props: {
    topImage: {
      type: Array,
      defualt(){
        return []
      }
    }
  },
  components: {
    Swiper, 
    SwiperItem
  },
  destroyed(){
    console.log('我销毁了');
    
  }
}
</script>

<style scoped >
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
