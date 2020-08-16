<template>
  <div class="cart" >
    <nav-bar clss = "nav-bar">
      <div slot="left">共{{length}}件</div>
      <div slot="center">购物车</div>
      <div slot="right"><button class="counts"  @click="deleteCart">删除</button></div>
    </nav-bar>
    {{this.$store.state.CartList}}
    <!-- 商品列表 -->
    <scroll class="content">
      <cart-list></cart-list>
    </scroll>
    <!-- 底部 -->
    <cart-buttom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'
import CartList from './CartChild/CartList'
import Scroll from 'components/common/scroll/Scroll'
import CartButtomBar from './CartChild/CartButtomBar'

import {deleteCartByDB} from 'network/cart'

import {getCartByDB} from 'network/cart'
export default {
  name:'Cart',
  created(){
     //console.log('main'+getCartByDB());
    getCartByDB().then(result => {
      console.log('result'+result);
      this.shops = result.data
      console.log(this.shops);
      //2.将商品添加到购物车 
      this.$store.dispatch('addDataToMutation',this.shops)
    })

    if( this.$store.state.RefreshPage.cart==0){
        console.log("开始刷新");
        this.reload()
        this.$store.state.RefreshPage.cart++
      }
  },
  inject: ['reload'],
  data() {
    return {
      shops: [],
    }
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartButtomBar
  },
  computed: {
    // cartListLength(){
    //   return this.$store.getters.cartListLength
    // }
    // ...mapGetters([
    //   'cartListLength',
    // ])
    ...mapGetters({
      length: 'cartListLength',
      list: 'cartList'
    }),
  },
  methods: {
    deleteCart(){
      console.log("deleteCart");
      
      console.log(this.list.length);
      for(let item of this.list){
        if(item.checked===true){
            console.log(item.iid);
            deleteCartByDB(item.iid)
            console.log("准备进入action");
            this.$store.dispatch('deleteDataToMutation',item.iid)
        }
      }
    }
  }
}
</script>

<style scoped >
    .nav-bar{
      background-color: var(--color-tint);
      color: #fff;
      font-weight: 700;
    }

    .cart {
    height: 100vh;
    background-color: #fff;
    }

    .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    }

    .counts{
    width: 40px;
    height: 30px;
    background-color: #ff5777;  
    border-radius: 5px;
    border-style: none;
    text-align: center;
    color: #fff;
  }
</style>
