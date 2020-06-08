<template>
  <div class="userinfo">
    <NavBar/>
    <img src="../assets/bg.jpg" alt="" class="bgcimg">
    <div>
        <UserDetail :Detail="model"/>
    </div>
  </div>
</template>


<script>
import NavBar from '../components/common/NavBar'
import UserDetail from '../components/usercommon/UserDetail'
export default {
  name:'UserInfo',
  components:{NavBar,UserDetail},
  props:{},
  data(){
    return {
      model:{}
    }
  },
  watch:{},
  computed:{},
  methods:{
    async UserinfoData() {
      const res=await this.$http.get('/user/'+localStorage.getItem('id'))
      
      this.model=res.data[0]
    }
  },
  created(){
    this.UserinfoData()
  },
  mounted(){
    
  }
}

</script>
<style scoped lang="less">
.userinfo{
  .bgcimg{
    width: 100%;
    height: 100px;
  }
}
</style>