<template>
  <div>
    <div class="comment">
      <span>评论</span>
      <span>({{length}})</span>
    </div>
    <div class="userinfo">
      <div>
        <img :src="userinfo.user_img" alt v-if="userinfo.user_img" @click="$router.push('/edit')" />
        <img  src="../../assets/user.png" alt v-else @click="$router.push('/edit')" />
      </div>
      <div>
        <input ref="postipt" v-model="commentContent" type="text" placeholder="说点什么把">
      </div>
      <div>
        <button @click="commentPublic">发表</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "",
  components: {},
  props: {length:Number},
  data() {
    return {
      userinfo: {},
      commentContent:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    async myUserinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.userinfo = res.data[0];
    },
    commentPublic(){
      if(!this.userinfo && !localStorage.getItem('token') && !localStorage.getItem('id')){
          this.$msg.fail('请先登陆')
          return
      }
      this.$emit('PostComment',this.commentContent)
      this.commentContent=''

    },
    foucsipt(){
      this.$refs.postipt.focus()
    }
  },
  created() {
    if(localStorage.getItem('token')){
        this.myUserinfo();
    }
  },
  mounted() {
  }
};
</script>
<style scoped lang="less">
.comment {
  display: flex;
  padding: 4.167vw;
  align-items: center;
  span:nth-child(2) {
    margin-left: 5.556vw;
    color: #ccc;
  }
}
.userinfo {
  padding: 0 4.167vw;
  display: flex;
  align-items: center;
  img {
    width: 6.667vw;
    height: 6.667vw;
    border-radius: 50%;
  }
  input{
    outline: none;
    border: 0;
    background-color: #ccc;
    border-radius: 4.167vw;
    margin-left: 5.556vw;
    padding: 1.389vw 0vw 1.389vw 4.167vw;
    font-size: 3.889vw;
  }
  button{
    outline: none;
    border: 0;
    border-radius: 2.778vw;
    margin-left: 2.778vw;
    background-color: #fb7299;
    color: white;
    font-size: 3.611vw;
    padding: 1.389vw 4.167vw;
  }
}
</style>