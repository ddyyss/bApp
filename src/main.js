import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import { Toast } from 'vant';
const http=axios.create({
  baseURL:'http://112.74.99.5:3000/web/api',

})

http.interceptors.request.use((config)=>{
  if(localStorage.getItem('token') && localStorage.getItem('id')){
   config.headers.Authorization='Bearer '+localStorage.getItem('token')
  }
  return config
})

http.interceptors.response.use((res)=>{
  return res
},(err)=>{
  if(err.response.status === 401 || err.response.status === 402){
    router.push('/login')
  }
  return Promise.reject(err)
})

Vue.prototype.$http=http
Vue.prototype.$msg=Toast
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
