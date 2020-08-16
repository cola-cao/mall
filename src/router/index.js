import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
const Login = () => import('../views/login/Login')
const Register = () => import('../views/register/Register')
const Payment = () => import('../views/payment/Payment')



// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      loginRegister:Login
    }
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      loginRegister:Register
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    components: {
      loginRegister:Payment
    }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出router
export default router
