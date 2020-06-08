<template>
  <div class="article">
    <NavBar />
    <div class="detailinfo">
      <div class="video">
        <video :src="article.content" controls></video>
      </div>
      <div class="detailtext">
        <van-collapse v-model="activeNames">
          <van-collapse-item :title="article.category.title+'---'+article.name" name="1">
            发布时间:{{article.date}}
            <br />
            发布人:{{article.userinfo.name}}
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="caozuo">
        <div class="show">
          <div @click="collectionClick" :class="{collectionActive:iscollectionActive}">
            <van-icon name="star" />
            <span>收藏</span>
          </div>
          <div @click="guanzhuClick" :class="{guanzhuActive:isguanzhuActive}">
            <van-icon name="invition" />
            <span>关注</span>
          </div>
          <div>
            <van-icon name="share" />
            <span>分享</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail">
      <Detail
        class="detailitem"
        @click.native="$router.push('/article/'+item.id)"
        v-for="(item,index) in commendList"
        :key="index"
        :detailitem="item"
      />
    </div>

    <Comment :length="length" @PostComment="postSuccess" ref="postChildClick" />
    <CommentList
      @lengthcomment="len=> length=len"
      ref="commentPublish"
      @publishClick="postChildClick"
    />
  </div>
</template>


<script>
import NavBar from "../components/common/NavBar";
import Detail from "./Detail";
import Comment from "../components/article/Comment";
import CommentList from "../components/article/CommentList";
export default {
  name: "Article",
  components: { NavBar, Detail, Comment, CommentList },
  props: {},
  data() {
    return {
      article: null,
      activeNames: ["0"],
      commendList: [],
      length: 0,
      posttrom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null
      },
      iscollectionActive: null,
      isguanzhuActive: null
    };
  },
  watch: {
    $route() {
      this.getArticle();
      this.getCommend();
      this.collectionInit();
    }
  },
  computed: {},
  methods: {
    async getArticle() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.article = res.data[0];
      this.guanzhuInit()
    },
    async getCommend() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    async postSuccess(data) {
      let date = new Date();
      let m = (date.getMonth() + 1).toString().padStart(2, "0");
      let d = date
        .getDate()
        .toString()
        .padStart(2, "0");
      let str = `${m}-${d}`;
      this.posttrom.comment_content = data;
      this.posttrom.comment_date = str;
      this.posttrom.article_id = this.$route.params.id;
      const res = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.posttrom
      );
      if (res.status == 200) {
        this.$msg.success("评论成功");
      }
      this.$refs.commentPublish.commentData();
      this.posttrom.parent_id = null;
    },
    postChildClick(id) {
      this.posttrom.parent_id = id;
      this.$refs.postChildClick.foucsipt();
    },
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.iscollectionActive = true;
        } else {
          this.iscollectionActive = false;
        }
      }
    },
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id
            }
          }
        );
        this.iscollectionActive = res.data.success;
      }
    },
    async guanzhuClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.article.userid}
        );
        if (res.data.msg == "关注成功") {
          this.isguanzhuActive = true;
        } else {
          this.isguanzhuActive = false;
        }
      }
    },
    async guanzhuInit(){
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.article.userid
            }
          }
        );
        this.isguanzhuActive = res.data.success;
      }
    }
  },
  created() {
    this.getArticle();
    this.getCommend();
    this.collectionInit();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.collectionActive {
  color: #fb7299;
}
.guanzhuActive {
  color: #fb7299;
}
.article {
  background-color: white;
}
.detailinfo {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.caozuo {
  background-color: white;
}
.show {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
.detail {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.778vw;
  justify-content: space-around;
  .detailitem {
    width: 45%;
    margin: 1.389vw 0;
  }
}
</style>