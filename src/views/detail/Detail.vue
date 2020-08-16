<template>
  <div class="detail">
  
    <detail-nav-bar @titleClick = "titleClick" class="nav-bar"/>
    <scroll class = "content"  ref="scroll" :probe-type = "3"
            @scroll = "contentScroll" >
      <detail-swiper :topImage = "topImage"/>
      <detail-base-info :goods = "goodsInfo" class = "baseInfo"></detail-base-info>
      <detail-shop-info :shop = "shop"/>
      <detail-image-info :detail-info ="detailInfo" @loadImgEvent="detailImageLoad"/>
      <detail-params-info :param-info = "itemParams" ref="params"/>
      <detail-comment-info :comment-info = "commentInfo" ref ="commentInfo"/>
      <goods-list :goods = "recommends" ref ="recommends"/>
      
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <detail-bottom-bar @addCart = "addCart"/>
  </div>
</template>

<script>

import DetailNavBar from 'views/detail/detailcomps/DetailNavBar'
import DetailSwiper from 'views/detail/detailcomps/DetailSwiper'
import DetailBaseInfo from './detailcomps/DetailBaseInfo'
import DetailShopInfo from './detailcomps/DetialShopInfo'
import DetailImageInfo from './detailcomps/DetailImageInfo'
import DetailParamsInfo from './detailcomps/DetailParamsInfo'
import DetailCommentInfo from './detailcomps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from 'views/detail/detailcomps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'


import Scroll from 'components/common/scroll/Scroll'



import {detailData,Goods,getRecommend} from 'network/detail'



export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImage: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo:{},
      recommends: [],
      themeTopY: [],
      bcFuncTheme: null,
      isShowBackTop: false
      
  }
  },
  methods: {
    detailImageLoad(){
      
      this.themeTopY = []
          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.params.$el.offsetTop)
          this.themeTopY.push(this.$refs.commentInfo.$el.offsetTop)
          this.themeTopY.push(this.$refs.recommends.$el.offsetTop)
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopY[index],500)
      
    },
    backClick(){

        console.log('我可以');

        this.$refs.scroll.scroll.scrollTo(0,0,500)
        
      },
    contentScroll(position){
          //console.log(position);
          //判断BackTop是否
          if(-position.y > 1000){
            this.isShowBackTop = true
          }else{
            this.isShowBackTop = false
          }
        
      },
      addCart(){

        //1.获取购物车需要的信息
        console.log('------------------');
        const product = {}
        product.image = this.topImage[0];
        product.title = this.goodsInfo.title;
        product.descr = this.goodsInfo.desc;
        product.price = this.goodsInfo.realPrice;
        product.iid = this.iid;
        product.counts = 1
        
        //2.将商品添加到购物车
        this.$store.dispatch('addCart',product)
      }
  },
  created() {
      // 1.保存传入的iid 
      this.iid = this.$route.params.iid
      console.log(this.iid);
      

      //2.请求详情数据 

      detailData(this.iid).then( res => {
        console.log(res);
        //1.获取数据
        const data = res.result

        //2.取出轮播图数据
        this.topImage = data.itemInfo.topImages

        //3.创建商品对象

        this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //4.取出shopInfo
        
        this.shop = data.shopInfo

        //5.取出detailInfo
        this.detailInfo = data.detailInfo

        //6.取出参数信息
        this.itemParams = data.itemParams
         //7.取出评价的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

      })
      
      //3.请求recommend

      getRecommend().then( res => {
        console.log(res);
        this.recommends = res.data.list
      })
       //4.给getThemeTopY赋值
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
}
</script>

<style scoped >
    .detail {
      height: 100vh;
      /* background-color: red; */
      position: relative;
      z-index: 2;
    }
    .content {
      position: absolute;
      top: 44px;
      bottom: 58px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
</style>
