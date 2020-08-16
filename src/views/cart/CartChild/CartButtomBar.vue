<template>
  <div class="bottom-bar">
    <div class="content">
      <check-button class="checked-all" 
                    :value = "isSelectAll"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      总价: {{totalPrice}}
    </div>
    <div class = "calculate" @click="calculate">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
export default {
  name: 'CartButtomBar',
  data() {
    return {

    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(element => {
          element.checked = false
        });
      }else{
        this.$store.state.cartList.forEach(element => {
          element.checked = true
        });
      }
      
    },
    calculate(){
      this.$router.push('/payment')
    }
  },
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter( item=> {
        return item.checked
      }).reduce((preValue,item) => {
        return (item.price * item.counts + preValue)
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter( item => {
        return item.checked
      }).length
    },
    isSelectAll(){

      if(this.$store.state.cartList.length === 0) return false
      return  !(this.$store.state.cartList.filter( item => !item.checked ).length)

    }
  },
}
</script>

<style scoped >
    .bottom-bar {
      height: 40px;
      background-color: #eee;
      position: relative;
      bottom: 40px;
      line-height: 40px;
      display: flex;
    }
    .content {
      display: flex;
      align-items: center;
      width: 60px;
    }
    .checked-all{
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-left: 5px;
    }
    .price {
      margin-left: 20px;
      flex: 1;
    }
    .calculate {
      width: 90px;
      background: #ff5f3e;
      color: #fff;
      align-content: center;
    }
</style>
