<template>
  <div>
    <LoginTop middleTop="注册Bi">
      <div slot="right" @click="$router.push('/login')" style="font-size:3.611vw">切换到登陆</div>
    </LoginTop>
    <LoginText
      label="姓名"
      style="margin:4.167vw 0;"
      rule="^.{6,16}$"
      @inputSuccess="value => model.name=value"
    />
    <LoginText label="账号" rule="^.{6,16}$" @inputSuccess="value => model.username=value" />
    <LoginText
      label="密码"
      type="password"
      rule="^.{6,16}$"
      @inputSuccess="value => model.password=value"
    />
    <LoginBtn btntext="注册" @registerClick="registerClick" />
  </div>
</template>


<script>
import LoginTop from "../components/common/LoginTop";
import LoginText from "../components/common/LoginText";
import LoginBtn from "../components/common/LoginBtn";
export default {
  name: "Regeister",
  components: { LoginTop, LoginText, LoginBtn },
  props: {},
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    async registerClick() {
      let reg = /^.{6,16}$/;
      if (
        reg.test(this.model.name) &&
        reg.test(this.model.username) &&
        reg.test(this.model.password)
      ) {
        const res = await this.$http.post("register", this.model);
        this.$msg.success({
          message: res.data.msg,
          duration: 500
        });
        console.log(res);
        
        /* --------------------- */
        if (res.data.code == 200) {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.objtoken);

          setTimeout(() => {
            this.$router.push("/userinfo");
          }, 1500);
        }
      } else {
        this.$msg.fail({
          message: "格式不正确，请重新输入",
          duration: 500
        });
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>