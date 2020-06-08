<template>
  <div class="main">
    <div v-for="(item,index) in commentList" :key="index">
    <div class="content">
      <div class="contentimg">
        <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
        <img src="../../assets/user.png" alt="" v-else>
      </div>
      <div class="contentitem">
        <div class="author">
            <span>{{item.userinfo.name}}</span>
            <span>{{item.comment_date}}</span>
        </div>
        <div class="article">
          {{item.comment_content}}
          <span class="public" @click="publishClick(item.comment_id)">回复</span>
        </div>
      </div>
    </div>
      <CommentItems @postChild="publishClick" :commentItem="item.child"/>
    </div>
  </div>
</template>


<script>
import CommentItems from './CommentItem'
export default {
  name:'',
  components:{CommentItems},
  props:{},
  data(){
    return {
      commentList:null
    }
  },
  watch:{},
  computed:{},
  methods:{
    async commentData(){
      const res=await this.$http.get('/comment/'+this.$route.params.id) 
      if(res.data){
        this.$emit('lengthcomment',res.data.length)
      }
      this.commentList= this.changeCommentData(res.data)  
    },
    changeCommentData(data){
       function fn(temp) {
      let arr1 = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].parent_id == temp) {
          arr1.push(data[i])
          data[i].child=fn(data[i].comment_id)
        }
      }
      return arr1
    }
    return fn(null)
    },
    publishClick(id){
      this.$emit('publishClick',id)
      
    }
  },
  created(){
    this.commentData()
  },
  mounted(){}
}

</script>
<style scoped lang="less">
.main{
  padding: 2.778vw 2.778vw;
  >div{
      border-bottom: 0.278vw solid #ccc;
  }
}
.content{
  display: flex;

  .contentimg{
    img{
      width: 9.722vw;
      height: 9.722vw;
      border-radius: 50%;
    }
  }
  .contentitem{
    margin-left: 2.778vw;
    flex: 1;
    .author{
      display: flex;
      justify-content: space-between;
      font-size: 3.611vw;
      color: #ccc;
      padding: 1.389vw 0;
    }
    .article{
      position: relative;
      padding: 1.389vw 0;
      .public{
        position: absolute;
        right: 0;
        color: red;
      }
    }
  }
}
</style>