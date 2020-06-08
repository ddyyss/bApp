<template>
  <div class="btn" @click="register">
    <div class="loginbtn">{{btntext}}</div>
  </div>
</template>


<script>
export default {
  name:'',
  components:{},
  props:['btntext'],
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    register(){
      this.$emit('registerClick')
    }
  },
  created(){},
  mounted(){}
}

</script>
<style scoped>
.btn{
  margin: 4.167vw 2.778vw;
}
.loginbtn{
  height: 45px;
  background-color: #ff9db5;
  border-radius: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>