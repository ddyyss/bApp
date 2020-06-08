<template>
  <div>
    <div style="margin-bottom:10px">
      <NavBar />
    </div>
    <div class="editbanner">
      <div class="upload">
        <van-uploader preview-size="100vw" :after-read="afterRead" />
        <EditBanner left="头像">
          <img :src="model.user_img" slot="right" alt v-if="model.user_img" />
          <img src="../assets/user.png" slot="right" alt v-else />
        </EditBanner>
      </div>
      <EditBanner left="昵称" @click.native="showusername=true">
        <a href="javascript:;" slot="right">{{model.username}}</a>
      </EditBanner>
      <EditBanner left="账号">
        <a href="javascript:;" slot="right">{{model.name}}</a>
      </EditBanner>
      <EditBanner left="性别"  @click.native="showgender=true">
        <a href="javascript:;" slot="right">{{model.gender==1? '男':'女'}}</a>
      </EditBanner>
      <EditBanner left="出生日期"></EditBanner>
      <EditBanner left="个性签名" @click.native="showuserdesc=true">
        <a href="javascript:;" slot="right" v-if="model.user_desc">{{model.user_desc}}</a>
        <a href="javascript:;" slot="right" v-else>啥都没写</a>
      </EditBanner>
    </div>

    <div class="editback" @click="$router.back()">
      返回个人中心
    </div>

    <van-dialog v-model="showusername" title="昵称" show-cancel-button @confirm="confirmusername" @close="text=''">
      <van-field v-model="text" autofocus />
    </van-dialog>

     <van-dialog v-model="showuserdesc" title="个性签名" show-cancel-button @confirm="confirmtextarea" @close="text=''">
      <van-field v-model="text" type="textarea" autofocus />
    </van-dialog>

    <van-action-sheet v-model="showgender" :actions="actions" @select="onSelect" />
  </div>
</template>


<script>
import NavBar from "../components/common/NavBar";
import EditBanner from "../components/common/EditBanner";
export default {
  name: "Edit",
  components: { NavBar, EditBanner },
  props: {},
  data() {
    return {
      model: {},
      showusername:false,
      showuserdesc:false,
      showgender:false,
      text:'',
      actions: [{ name: '男',val:1 }, { name: '女',val:0 }],
    };
  },
  watch: {},
  computed: {},
  methods: {
    async selectid() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      console.log(res);
      
      this.model = res.data[0];
    },
    async afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.UserUpdate();
    },
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
    },
   confirmusername(){
     this.model.username=this.text
     this.UserUpdate()
   },
   confirmtextarea(){
     this.model.user_desc=this.text
     this.UserUpdate()
   },
   onSelect(data){
     console.log(data);
     
     this.model.gender=data.val
     this.UserUpdate()
     this.showgender=false
   }
  },
  created() {
    this.selectid();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.editbanner a {
  color: #333;
}
.editbanner img {
  width: 12.778vw;
  height: 12.778vw;
  border-radius: 50%;
}
.upload {
  position: relative;
  overflow: hidden;
  .van-uploader {
    position: absolute;
    opacity: 0;
  }
}
.editback{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #999;
  padding: 4.167vw 0;
  margin-top: 2.778vw;
  border-radius: 4.167vw;
  border: 0.278vw solid pink;
  font-size: 4.167vw;
}
</style>