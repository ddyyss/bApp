<template>
  <div class="contentmain">
    <div  v-for="(item,index) in commentItem" :key="index">
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
        <div class="article" v-if="!temp">
          {{item.comment_content}}
          <span class="public" @click="Postitemcomment(item.comment_id)">回复</span>
        </div>
        <div class="article" v-else>
           回复<span style="color:blue">{{item.parent_user_info.name}}</span>:{{item.comment_content}}
           <span class="public" @click="Postitemcomment(item.comment_id)">回复</span>
        </div>
      </div>
      </div>
      <div>
        <commentchild-item @postChild="postChild" :commentItem="item.child" :temp="true"/>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:'commentchildItem',
  components:{},
  props:{commentItem:Array,temp:Boolean},
  data(){
    return {
      
    }
  },
  watch:{},
  computed:{},
  methods:{
    Postitemcomment(id){
      this.$emit('postChild',id)
      
    },
    postChild(id){ 
      this.Postitemcomment(id)
    }
  },
  created(){},
  mounted(){}
}

</script>
<style scoped lang="less">
.contentmain{
  //padding: 0 0 0 12.5vw;
  

.content{
  display: flex;
  padding: 0 0 0 45px;
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
    }
    .article{
      position: relative;
      padding: 2.778vw 0;
      .public{
        position: absolute;
        right: 5px;
        color: red;
      }
    }
  }
}
}
</style>