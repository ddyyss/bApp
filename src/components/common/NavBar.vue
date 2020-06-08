<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/home')">
      <img src="../../assets/logo2.png" alt="">
    </div>
    <div>
      <p>
        输入
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img :src="imgurl" alt="" v-if="imgurl" @click="$router.push('/edit')">
      <img src="../../assets/user.png" alt="" v-else @click="$router.push('/edit')">
      <p>下载APP</p>
    </div>
  </div>
</template>


<script>
export default {
  name:'',
  components:{},
  props:{
  },
  data(){
    return {
      imgurl:''
    }
  },
  watch:{},
  computed:{},
  methods:{

  },
  created(){

  },
  async mounted(){
    if(localStorage.getItem('token')){
    const res=await this.$http.get('/user/'+localStorage.getItem('id'))
    this.imgurl=res.data[0].user_img
    }
  }
}

</script>
<style scoped lang="less">
.navbar{
  height: 12.5vw;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  div:nth-child(2){
    flex: 1;
    p{
      position: relative;
      width: 80%;
      background-color: #f4f4f4;
      //padding: 3.333vw 0vw;
      height: 6.389vw;
      padding-left: 7.222vw;
      border-radius: 5.556vw;
      font-size: 3.889vw;
    }
    .ipt-icon{
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translate(0,-40%);
    }
  }
  div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 6.667vw;
      height: 6.667vw;
    }
    p{
      padding: 1.389vw 2.778vw;
      margin: 0 2.222vw;
      border-radius: 0.833vw;
      background-color: #fb7299;
      color: white;
      font-size: 3.611vw;
    }
  }
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 27.778vw;
    img{
      width: 70%;
      height: 80%;
  }
  }
  
}
</style>