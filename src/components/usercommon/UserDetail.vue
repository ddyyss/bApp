<template>
  <div>
    <div class="userDetail">
      <div class="user_img">
        <img v-if="Detail.user_img" :src="Detail.user_img" alt="">
        <img v-else src="../../assets/bg.jpg" alt />
      </div>
      <div class="user_edit">
        <div class="user_info">
          <p>
            <span>0</span>
            <span class="text_color">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="text_color">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="text_color">获赞</span>
          </p>
        </div>
        <div class="btn">
          <div @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="user_alone">
      <h2>{{Detail.username}}</h2>
      <p v-if="Detail.user_desc">{{Detail.user_desc}}</p>
      <p v-else>啥都没写</p>
    </div>
    <div class="tab">
      <van-tabs v-model="active" class="ipt-tabs">
        <van-tab title="动态">动态</van-tab>
        <van-tab title="视频">视频</van-tab>
      </van-tabs>
    </div>
  </div>
</template>


<script>
export default {
  name: "",
  components: {},
  props: {
    Detail:Object
  },
  data() {
    return {
      active: 1
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.userDetail {
  background-color: #fff;
  padding: 0 3.333vw;
  display: flex;
  .user_img {
    img {
      width: 23.611vw;
      height: 23.611vw;
      border-radius: 50%;
    }
  }
  .user_edit {
    flex: 1;
    margin-left: 13.889vw;
    display: flex;
    flex-direction: column;
    .user_info {
      display: flex;
      p {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 3.889vw;
        .text_color {
          color: #aaa;
        }
      }
      p:nth-child(1),
      p:nth-child(2) {
        border-right: 0.278vw solid #ccc;
      }
    }
    .btn {
      padding: 1.389vw 2.778vw;
      > div {
        border: 0.278vw solid #fb7a9f;
        padding: 0.833vw;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fb7a9f;
        border-radius: 0.833vw;
      }
    }
  }
}
.user_alone {
  background-color: #fff;
  h2 {
    margin: 0;
    padding: 0;
  }
}
.tab {
  background-color: #fff;
  width: 100%;
  margin-top: -4.722vw;
  .ipt-tabs {
    width: 30%;
  }
}
</style>