<template>
  <div class="user-info">
    <img class="avatar2" src="~assets/img/profile/avatar.jpg" alt="" v-if="isActive">
     <img class="avatar" src="~assets/img/profile/avatar.svg" alt="" v-else>
    <div class="info" v-if="isActive">
      <div class="login">已登录</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>{{username}}</span>
      </div>
    </div>
    <div class="info" v-else>
      <div class="login" @click="loginRegister">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
	export default {
    name: "UserInfo",
    created(){
    this.isUser = Cookies.get('user')
  },
    data(){
      return{
        isUser: '',
        user: Cookies.get('user')
      }
    },
    computed:{
      username(){
      console.log("进来了2");
      if(this.isUser == "undefined" || this.isUser == null || this.isUser == ""){
        console.log("进来了");
        return ''
      }else{
        console.log("进来了3");
        return this.user.substring(0,4)+"**"+this.user.substring(7,11)
      }
    },
    isActive(){
      if(this.isUser!== ''&&this.isUser!=="undefined"&&this.isUser!==null){
        console.log("进来了4");
        return true
      }else{
        return false
      }
    }
    },
    methods:{
      loginRegister(){
        this.$router.push('/login')
      }
    }
	}
</script>

<style scoped>
  .user-info {
    height: 85px;
    background-color: var(--color-tint);
    padding: 6px 15px;

    display: flex;
    color: #fff;
  }
  
  .user-info .avatar {
    width: 70px;
    height: 70px;
  }

  .info {
    padding-left: 15px;
    flex: 1;
  }

  .info .login {
    margin-top: 15px;
  }

  .phone img {
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }

  .phone span {
    font-size: 13px;
  }

  .arrow {
    width: 20px;
    line-height: 85px;
  }

  .arrow img {
    width: 20px;
  }
  .avatar2{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
</style>