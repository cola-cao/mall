<template>
<div>
  <el-card class="box-card"> 
    <div class="paymentMsg" ><i class="el-icon-success">支付成功</i></div>
  </el-card>
  <el-card class="box-card">
  <div style="height: 150px;">
  <el-steps direction="vertical" :active="1">
    <el-step title="支付完成" status="success"></el-step>
    <el-step title="订单处理中" warning ></el-step>
    <el-step title="未派送" ></el-step>
  </el-steps>
</div>
</el-card>
<div class="coment">
  <div>
    <p>购买体验:</p>
  <el-rate calss="star"
  v-model="value"
  show-text></el-rate>
  </div>
  <div>
    <p>支付评价:</p>
  <el-rate calss="star"
  v-model="value1"
  show-text></el-rate>
  </div>
  <div>
    <p>商家态度:</p>
  <el-rate calss="star"
  v-model="value2"
  show-text></el-rate>  
  </div>
</div>

<el-button class = "btn" @click="btn" type="info" plain round>返回</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      value1: null,
      value2: null,
    }
  },
  methods:{
    btn(){
      window.history.go(-1);
    }
  },
  components: {

  }
}
</script>

<style scoped >
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .paymentMsg{
    width: 80%;
    color: #67C23A;
  }

  .paymentMsg i{
    margin-top: 10px;
    margin-left: 100px;
  }
  .coment{
    margin-top: 30px;
    box-shadow: 0px 1px 1px #eeeeee;
  }

  .btn{
    margin-top: 20px;
    margin-left: 30px;
  }
</style>
