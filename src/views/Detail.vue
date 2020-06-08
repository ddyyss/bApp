<template>
  <div class="detailitem">
    <div class="imgparent">
      <img :src="detailitem.img" alt class="detailimg" />
      <div class="otherintroduce">
        <div class="video">
          <van-icon name="play-circle-o" />
          <span>77</span>
        </div>
        <div class="comment">
          <van-icon name="comment-o" />
          <span>66</span>
        </div>
      </div>
    </div>
    <p>{{detailitem.name}}</p>
  </div>
</template>


<script>
export default {
  name: "",
  components: {},
  props: {
    detailitem: Object
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.detailimg {
  width: 100%;
}
.detailitem {
  p {
    font-size: 3.333vw;
  }
}
.imgparent {
  position: relative;
  .otherintroduce {
    position: absolute;
    width: 95%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
    //background-color: black;
    .video {
      color: white;
      display: flex;
      align-items: center;
    }
    .comment {
      color: white;
      display: flex;
      align-items: center;
    }
  }
}
</style>