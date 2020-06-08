<template>
  <div class="home">
    <NavBar />
    <div class="content">
      
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list v-model="item.loading" :immediate-check="false" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <div class="detail">
            <Detail
              @click.native="$router.push('/article/'+categoryitem.id)"
              class="detailitem"
              :detailitem="categoryitem"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <van-icon class="list" name="setting-o" @click="$router.push('/selector')"/>
    </div>
  </div>
</template>


<script>
import NavBar from "../components/common/NavBar";
import Detail from "./Detail";
export default {
  name: "Home",
  components: { NavBar, Detail },
  props: {},
  data() {
    return {
      category: [],
      active: 0
    };
  },
  watch: {
    active() {
      this.selectArticle();
    }
  },
  computed: {},
  methods: {
    async getCategory() {
      if(localStorage.getItem('newCate') && localStorage.getItem('deleteCate')){
      let newCate=JSON.parse(localStorage.getItem('newCate'))
      this.changeCategory(newCate);
      this.selectArticle()
      return
    }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
      this.selectArticle()
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 1;
        item.pagesize = 10;
        item.loading=false;
        item.finished=false
        return item;
      });
      this.category = category1;
    },
    async selectArticle() {
      const categoryitem = this.category[this.active];
      //console.log(categoryitem._id);

      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      categoryitem.list.push(...res.data)
      categoryitem.loading=false
      if(res.data.length<categoryitem.pagesize){
        categoryitem.finished=true
      }
    },
    onLoad(){
      console.log(this.category[this.active]);
      const categoryitem=this.category[this.active]
        categoryitem.page +=1
        this.selectArticle()
      }

  },
  created() {
    this.getCategory();
  },
  mounted() {},
  activated() {
    this.getCategory();
  },
};
</script>
<style scoped lang="less">
.home {
  background-color: white;
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
.content{
  position: relative;

  .list{
    width: 5.556vw;
    height: 8.333vw;
    font-size: 5.556vw;
    background-color: white;
    position: absolute;
    z-index: 99;
    top: 2.778vw;
    right: 0;
    line-height: 8.333vw;
    padding-right: 2.778vw;
  }
}
</style>