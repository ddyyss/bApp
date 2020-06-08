import Vue from 'vue'
import VueRouter from 'vue-router'

const Register=()=>import('../views/Register.vue')
const Login=()=>import('../views/Login.vue')
const UserInfo=()=>import('../views/UserInfo.vue')
const Edit=()=>import('../views/Edit.vue')
const Home=()=>import('../views/Home.vue')
const Article=()=>import('../views/Article.vue')
const Selector=()=>import('../views/Selector.vue')
Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/selector',
      name: 'Selector',
      component: Selector
    },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo,
    meta:{
      istoken:true
    }
  },
  {
    path:'/edit',
    name:'Edit',
    component:Edit,
    meta:{
      istoken:true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  //if(to.path==='/login') return next()
  if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken==true){
    return next('/login')
  }
    next()
  
  //
})
export default router
