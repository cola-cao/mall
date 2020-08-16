<template>
  <div id="home">
    <div class = "home-nav"><nav-bar><div slot="left" class="left"></div><div slot="center">美丽说</div> </nav-bar></div>
      <tab-control :title="['流行','新款','精选']" 
                    @tabClick = "tabClick" 
                    ref="toControl1"
                    class="tabControl"
                    v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" :probe-type = "3"
            @scroll = "contentScroll" 
            :pull-up-load = "pullUpLoad"
            @pullingUp = "loadMore">
      <home-swiper :banners = "banners" @swiperImageLoad = "swiperImageLoad" ></home-swiper>
      <recommend-view :recommends = "recommends"></recommend-view>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']" 
                    class="tab-control" 
                    @tabClick = "tabClick" 
                    ref="toControl"
                    :class = "{fixed: isTabFixed}"/>
      <goods-list :goods = "showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getCookie} from '../../common/utils'

import {
  getHomeSwiper,
  getHomeRecommend,
  getHomePop,
  getHomeSell,
  getHomeNew
} from 'network/home'
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  name: 'Home',
  inject: ['reload'],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0,list:[]},
        'sell': {page: 0,list:[]}
      },
      currentIndex: 'pop',
      isShowBackTop: false,
      pullUpLoad: true,
      isTabFixed: false,
      tabOffSetTop: 0,
      saveY: 0,
      cookie: '',
      isUser: '',
    }
  },
  created(){
    new Promise( (resolve,reject) => {
                //1.请求轮播图数据
                this.getHomeSwiper()
                //2.请求recommends数据
                this.getHomeRecommend()
                //3.请求商品数据
                this.getHomePop('pop')
                this.getHomeNew('new')
                this.getHomeSell('sell')
                this.isUser = Cookies.get('user')
                if(this.isUser != "undefined" && this.isUser != null && this.isUser != ""){
                  resolve()
                }
            
            }).then(res => {
                  if(this.$store.state.RefreshPage.home==0){
                  console.log("开始刷新");
                  this.reload()
                  this.$store.state.RefreshPage.home++
                  console.log("==>"+this.$store.state.RefreshPage.home);
                }
              }).catch( res =>{
                  console.log(res);
                  console.log(res);
                  
              })
  },

    deactivated() {
      console.log('返回');
      
      this.saveY = this.$refs.scroll.scroll.y
      console.log(this.saveY);
      
    },

  components: {
  
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    NavBar,
    GoodsList,
    Scroll,
    BackTop
  },

  computed: {
    showGoods(){

      return this.goods[this.currentIndex].list
    },
    username(){
      console.log("进来了2");
      if(this.isUser == "undefined" || this.isUser == null || this.isUser == ""){
        console.log("进来了");
        return ''
      }else{
        console.log("进来了3");
        return '欢迎！'+this.isUser.substring(0,4)+"**"
      }
    }
  },
  methods: {
    
    /**
     * 事件监听的相关方法
     */
      tabClick(index){
        console.log(index);
        switch(index){
          case 0 :
            this.currentIndex = 'pop';
            break;
          case 1 :
            this.currentIndex = 'new';
            break;
          case 2 :
            this.currentIndex = 'sell';
            break;
        }

        this.$refs.toControl1.currentIndex = index
        this.$refs.toControl.currentIndex = index
      },

      backClick(){

        console.log('我可以');

        this.$refs.scroll.scroll.scrollTo(0,0,500)
        
      },

      loadMore(){
        console.log('上拉加载更多');
        switch(this.currentIndex){
          case 'pop' :
            this.getHomePop(this.currentIndex);
            break;
          case 'sell' :
            this.getHomeSell(this.currentIndex);
            break;
          case 'new' :
            this.getHomeNew(this.currentIndex);
            break;
        }
      },

      contentScroll(position){
          //console.log(position);
          //判断BackTop是否
          if(-position.y > 1000){
            this.isShowBackTop = true
          }else{
            this.isShowBackTop = false
          }

          //判断是否吸顶

          this.isTabFixed  = (-position.y) >  this.tabOffSetTop
          

      },

      swiperImageLoad(){
        
        this.tabOffSetTop = this.$refs.toControl.$el.offsetTop
      },

    /**
     * 网络请求的相关方法
     */
    //获取轮播图
    getHomeSwiper(){
      getHomeSwiper().then( res => {
      console.log('hemoSwiper'+res);
      this.banners = res
    })
  },

  //获取recommends
    getHomeRecommend(){
      getHomeRecommend().then( res => {
        console.log(res);
        this.recommends = res
        
      })
    },
  //获取 pop 数据
  getHomePop(type){
    const page = this.goods[type].page + 1
      getHomePop(page).then( res => {
      console.log(res);
      this.goods[type].list.push(...res),
      this.goods[type].page += 1
      this.$refs.scroll.scroll.finishPullUp()
    })
  },

  //获取 sell 数据
  getHomeSell(type){
    const page = this.goods[type].page + 1
      getHomeSell(page).then( res => {
      console.log(res);
      this.goods[type].list.push(...res),
      this.goods[type].page += 1
      this.$refs.scroll.scroll.finishPullUp()
    })
  },

  //获取 new 数据
  getHomeNew(type){
    const page = this.goods[type].page + 1
      getHomeNew(page).then( res => {
      console.log(res);
      this.goods[type].list.push(...res),
      this.goods[type].page += 1
      this.$refs.scroll.scroll.finishPullUp()
    })
  }
    
  }
}
</script>

<style scoped >
  
  #home {

    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;

    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  
  /* .tab-control {

    position: sticky;
    top: 43px;
    z-index: 9;
  } */
  .tabControl {
    position: relative;
    z-index: 9;
  }
  .content {
    
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  
  .left{
    width: 100px;
  }
</style>
