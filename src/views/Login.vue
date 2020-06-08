<template>
  <div>
    <LoginTop middleTop="登陆">
      <div slot="right" @click="$router.push('/register')" style="font-size:3.611vw">切换到注册</div>
    </LoginTop>
    <LoginText label="账号"
        style="margin:4.167vw 0;" 
        rule="^.{6,16}$"
        @inputSuccess="value => model.username=value"
     />
    <LoginText label="密码"
        type="password"
        style="margin:4.167vw 0;" 
        rule="^.{6,16}$"
        @inputSuccess="value => model.password=value"
    />
    <LoginBtn btntext="登陆" @registerClick="LoginClick"/>
  </div>
</template>


<script>
import LoginTop from '../components/common/LoginTop'
import LoginText from '../components/common/LoginText'
import LoginBtn from '../components/common/LoginBtn'
export default {
  name:'Login',
  components:{LoginTop,LoginText,LoginBtn},
  props:{},
  data(){
    return {
      model:{
        username:'',
        password:''
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    async LoginClick(){
     let reg=/^.{6,16}$/
      if(reg.test(this.model.username) && reg.test(this.model.password)){
          const res=await this.$http.post('/login',this.model)   
          if(res.data.code===200){           
          this.$msg.success(res.data.msg)
          /* --------------------- */
          localStorage.setItem('id',res.data.id)
          localStorage.setItem('token',res.data.token)

          setTimeout(()=>{
            this.$router.push('/userinfo')
          },1500)
          }else{
            this.$msg.fail(res.data.msg)
          }
          

      }else{
        this.$msg.fail('格式不正确，请重新输入')
      }
    }
  },
  created(){},
  mounted(){}
}

</script>
<style scoped>

</style>