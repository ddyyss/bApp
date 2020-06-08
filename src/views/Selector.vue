<template>
  <div>
    <NavBar />
    <van-divider :style="{color:'blue',borderColor:'blue'}" dashed>现有栏目</van-divider>
    <div class="new-category newcategory">
      <p v-for="(item,index) in newCate" :key="index" @click="handlenewCate(index)">{{item.title}}</p>
    </div>
    <van-divider :style="{color:'pink',borderColor:'pink'}" dashed>已删除栏目</van-divider>
    <div class="new-category deletecategory">
      <p
        v-for="(item,index) in deleteCate"
        :key="index"
        @click="handledeleteCate(index)"
      >{{item.title}}</p>
    </div>
  </div>
</template>


<script>
import NavBar from "../components/common/NavBar";
export default {
  name: "Selector",
  components: { NavBar },
  props: {},
  data() {
    return {
      newCate: [],
      deleteCate: []
    };
  },
  watch: {
    newCate(){
      localStorage.setItem('newCate',JSON.stringify(this.newCate))
      localStorage.setItem('deleteCate',JSON.stringify(this.deleteCate))
    }
  },
  computed: {},
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      console.log(res);
      this.newCate = res.data;
    },
    handlenewCate(index) {
      if(this.newCate.length<4){
        this.$msg.fail('最少保留三个栏目')
        return
      }
      this.deleteCate.push(this.newCate[index]);
      this.newCate.splice(index, 1);
    },
    handledeleteCate(index) {
      this.newCate.push(this.deleteCate[index]);
      this.deleteCate.splice(index, 1);
    }
  },
  created() {
    if(localStorage.getItem('newCate') && localStorage.getItem('deleteCate')){
      this.newCate=JSON.parse(localStorage.getItem('newCate'))
      this.deleteCate=JSON.parse(localStorage.getItem('deleteCate'))
      return
    }
    this.selectCategory();
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.new-category {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  > p {
    width: 20%;
    padding: 1.944vw 0vw;
    margin: 1.389vw 1.944vw;
    text-align: center;
  }
}
.newcategory {
  > p {
    border: 1px solid blue;
  }
}
.deletecategory {
  > p {
    border: 1px solid pink;
  }
}
</style>