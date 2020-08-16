<template>
  <!-- <div class = "login">
    <el-form ref="loginForm" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="pwd" show-password type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="login_1">登录</el-button>
      </el-form-item>
    </el-form>
    <div class = "nav-bar"> </div>
  </div>-->
  <div>
    <el-form ref="ruleForm" label-width="60px" class="demo-ruleForm">
      <div class="login">
        <div class="logo">
          <img src="~assets/img/login/login.jpg" alt />
          <div>美丽说</div>
        </div>
        <el-form-item label="手机号:" prop="username" class="item">
          <el-input type="text" v-model="username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" class="item">
          <el-input v-model="pwd" placeholder="请输入密码" show-password type="password"></el-input>
        </el-form-item>
        <el-form-item class="box">
          <el-checkbox v-model="checked">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="请仔细阅读所有款项" name="1">
                <div>1.这你都信，可恶啊弟弟</div>
              </el-collapse-item>
            </el-collapse>同意并已阅读所有选项
          </el-checkbox>
        </el-form-item>

        <el-form-item v-if="checked">
          <el-button
            icon="el-icon-position"
            @click="login_1"
            round
            size="small"
            class="button-login"
            :style="{backgroundColor:'#ff8198'}"
          >登录</el-button>
        </el-form-item>

        <el-form-item v-else>
          <el-button
            disabled
            icon="el-icon-position"
            @click="login_1"
            round
            size="small"
            class="button-login"
            :style="{backgroundColor:'#909399'}"
          >登录</el-button>
        </el-form-item>
      </div>
      <div class="acount">
        没有申请账户?
        <router-link to="/Register" style="color:#ff8198">立即注册</router-link>
      </div>
    </el-form>
    <div class="nav-bar"></div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      login: true,
      username: "",
      pwd: "",
      returnvalue: "",
      shareurl: "http://localhost:8085/mall/",
      name: "",
      activeNames: ["1"],
      checked: false,
      type: []
    };
  },
  created() {
    //这里mounted和created生命周期函数区别
    //发送get请求
    axios
      .get(this.shareurl + "islogin")
      .then(response => {
        var temps = response.data;
        if (temps.status == "login") {
          this.login = false;
          this.username = temps.msg;
        } else {
          this.login = true;
        }
      })
      .catch(error => console.log(error)); // 请求失败处理
  },
  methods: {
    login_1() {
      axios
        .post(
          this.shareurl +
            "login?username=" +
            this.username +
            "&password=" +
            this.pwd
        )
        .then(response => {
          console.log(response);
          var temps = response.data;
          if (temps.status == "success") {
            //this.returnvalue = '登录成功';
            this.login = false;
            this.$notify({
              message: "Hi!" + this.username + "欢迎回来",
              type: "success",
              showClose: false,
              position: "top-left",
              duration: 1500,
              offset: 10
            });

            new Promise((resolve, reject) => {
              console.log("进入promise");
              Cookies.set("user", this.username);
              resolve();
            })
              .then(res => {
                console.log("进入第二层");

                return new Promise((resolve, reject) => {
                  let user = Cookies.get("user");
                  console.log(user);
                  this.$router.push({ path: "/home" });
                });
              })
              .catch(err => {
                console.log(err);
              });

            this.$store.state.user = this.username;
          } else {
            this.returnvalue = temps.msg;
            alert(temps.msg);
          }
        })
        .catch(error => console.log(error)); // 请求失败处理
    },
    getname: function() {
      //发送get请求
      axios
        .get(this.shareurl + "username")
        .then(response => {
          this.name = response.data.msg;
        })
        .catch(error => (this.home = error.message)); // 请求失败处理
    },
    logout() {
      axios
        .post(this.shareurl + "logout")
        .then(response => {
          var temps = response.data;
          if (temps.status == "success") {
            //this.returnvalue = '退出成功';
            this.login = true;
          } else {
            this.returnvalue = temps.msg;
          }
        })
        .catch(error => console.log(error)); // 请求失败处理
    },

    handleChange(val) {
      console.log(val);
    }
  },
  //用户注册
  register() {
    this.$router.push("/register");
  }
};
</script>

<style scoped >
/* .login-box {
    width: 320px;
    margin: 0px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    align-content: center;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
  .nav-bar{
    width: 318px;
    height: 55px;
    margin-top: 170px;
    position: absolute;
    z-index: 1;
    background-color: #fff;
  }
  .login{
    margin-top: 50px;
  } */
.login {
  margin-top: 50px;
  align-content: center;
  height: 100%;
}
.item {
  width: 260px;
}
.logo {
  width: 160px;
  height: 50px;
  margin: 20px auto;
  text-align: center;
  font-size: 24px;
  color: #ff8198;
  font-weight: 700;
}
.logo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.button-login {
  width: 190px;
  background-color: #ff8198;
  color: #fff;
}
.box {
  margin: -10px auto;
}
.collapse {
  width: 0px;
}
.acount {
  margin-left: 50px;
  margin-top: 5px;
}
.logo div {
  float: right;
  margin-top: 15px;
}
.nav-bar {
  width: 318px;
  height: 55px;
  bottom: 0px;
  position: fixed;
  z-index: 1;
  background-color: #fff;
}
</style>
