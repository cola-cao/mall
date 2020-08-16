<template>
  <div class="account" v-if="isActive">
    <div class="account-item">
      <div class="number">
        <span class="balance">999</span>元
      </div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">5</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">1000</span>分
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
  <div class="account" v-else>
    <div class="account-item">
      <div class="number">
        <span class="balance">-- -</span>元
      </div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">--</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">--</span>分
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "AccountInfo",
  created() {
    this.isUser = Cookies.get("user");
  },
  data() {
    return {
      isUser: "",
      user: Cookies.get("user")
    };
  },
  computed: {
    username() {
      console.log("进来了2");
      if (
        this.isUser == "undefined" ||
        this.isUser == null ||
        this.isUser == ""
      ) {
        console.log("进来了");
        return "";
      } else {
        console.log("进来了3");
        return this.user.substring(0, 4) + "**" + this.user.substring(7, 11);
      }
    },
    isActive() {
      if (
        this.isUser != "" &&
        this.isUser != "undefined" &&
        this.isUser != null
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 20px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}
</style>