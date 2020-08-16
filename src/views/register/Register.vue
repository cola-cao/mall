<template>
<div>
  <i class="el-icon-arrow-left" id = "back" @click="back" >返回</i>
  <div class="logo">
    用户注册
  </div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="register">
    <el-form-item label="用户(*必填):"  prop="username" class="item">
        <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名" ></el-input>
      </el-form-item>
    <el-form-item label="密码(*必填)" prop="pass" class="item">
      <el-input type="password" placeholder="请输入密码" show-password v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" class="item">
      <el-input type="password" placeholder="请确认密码" show-password v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号(*必填)"  prop="phone" class="item">
      <el-input v-model.number="ruleForm.phone" placeholder="手机号为11位" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button  @click="submitForm('ruleForm')" class="btnSubmit">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>     
    </div>
  </el-form>
  <div class = "nav-bar"></div>
</div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      isActive: true;
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入手机号'));
          } else {
            if (value.toString().length!=11) {
              callback(new Error('必须是11位'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username: '',
          phone: ''
        },
        rules: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(this.ruleForm);
        const user = {username:this.ruleForm.username,password:this.ruleForm.pass,phone:this.ruleForm.phone+''}
        axios.defaults.withCredentials = false
        axios.post("http://localhost:8085/mall/register",user)
        .then( res => {
        //console.log(res);
          this.$notify({
            message: '新用户:'+this.username+'注册成功！',
            type: 'success',
            showClose: false,
            position: 'top-left',
            duration: 1500,
            offset: 10
            });
        }).catch( err => {
        //console.log(err);
          this.$notify({
            message: '用户已存在',
            type: 'warning',
            showClose: false,
            position: 'top-left',
            duration: 1500,
            offset: 10
            });
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      back(){
        this.isActive = !this.isActive,
        this.$router.push('/login')
      }
    }
  }
</script>

<style >
  .register{
    margin-top: 80px;
    align-content: center;
    height: 100%;
  }
  .item{
    width: 260px;
  }
  .logo{
    width: 100%;
    height: 10px;
    text-align: center;
    font-size: 24px;
    color: #ff8198;
    font-weight: 700;
    margin-bottom: -30px;
    margin-top: 30px;
  }
  .btnSubmit{
    color: #fff;
    background-color: #ff8198;
  }
  .nav-bar{
    width: 318px;
    height: 55px;
    bottom: 0px;
    position: fixed;
    z-index: 1;
    background-color: #fff;
  }
  #back{
    margin-top: 20px;
    color: #ff8198;
  }
</style>