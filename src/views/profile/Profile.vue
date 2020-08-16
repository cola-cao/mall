<template>
  <div>
    <div id="profile">
      <nav-bar class="nav-bar">
        <div slot="center">我的档案</div>
      </nav-bar>
      <user-info />
      <account-info />
      <normal-list-view :list-data="orderList" />
      <normal-list-view :list-data="serviceList" />
    </div>
    <el-button
      icon="el-icon-switch-button"
      @click="flish"
      round
      size="small"
      class="button-login"
    >退出</el-button>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

import UserInfo from "./childComps/UserInfo";
import AccountInfo from "./childComps/AccountInfo";
import NormalListView from "./childComps/NormalListView";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView
  },
  data() {
    return {
      refresh: 0
    };
  },
  created() {
    console.log("我是profile");
    console.log(this.refresh);

    if (this.$store.state.RefreshPage.profile == 0) {
      console.log("开始刷新");
      this.reload();
      this.$store.state.RefreshPage.profile++;
    }
  },
  inject: ["reload"],
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" }
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  },
  methods: {
    flish() {
      Cookies.remove("user");
      Cookies.remove("JSESSIONID");
      Cookies.remove("JSESSIONID");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.button-login {
  width: 190px;
  background-color: #ff8198;
  color: #fff;
  margin-top: 10px;
  margin-left: 50px;
}
</style>
