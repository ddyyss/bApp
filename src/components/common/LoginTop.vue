<template>
  <div class="LoginTop">
    <div></div>
    <div>{{middleTop}}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>


<script>
export default {
  name:'',
  components:{},
  props:{
    middleTop:String
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}

</script>
<style scoped lang="less">
.LoginTop{
  height: 45px;
  background-color: white;
  display: flex;
  div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
</style>