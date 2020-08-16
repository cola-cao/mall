import Vue from 'vue'
import App from './App.vue'

import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import {getCartByDB} from './network/cart'

import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);

//允许携带cookie 跨域访问关键
axios.defaults.withCredentials = true
console.log("允许携带cookie 跨域访问关键");
// http response 响应拦截器
axios.interceptors.response.use(response => {
    // 在接收响应做些什么，例如跳转到登录页
    console.log("跳转登录页");
    
    if (response.data.status == "logout") {
        router.push({
            path: 'login'
        })
    }
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
});

new Vue({
    render: h => h(App),
    router,
    store,
  // data: {
  //   shops: [],

  // },
  // created(){
  //   //console.log('main'+getCartByDB());
  //   getCartByDB().then(result => {
  //     console.log('result'+result);
  //     this.shops = result.data
  //     console.log(this.shops);
  //     //2.将商品添加到购物车 
  //     this.$store.dispatch('addDataToMutation',this.shops)
  //   })
  // //this.$store.commit('addDataToVuex',this.shops)
  // }
}).$mount('#app')


