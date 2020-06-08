<template>
  <div class="editbanner">
      <span>{{left}}</span>
      <span><slot name="right"></slot></span>
  </div>
</template>


<script>
export default {
  name:'',
  components:{},
  props:['left'],
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
<style scoped>
.editbanner{
  background-color: white;
  padding: 4.167vw;
  color: #333;
  font-size: 4.444vw;
  border-bottom: 0.278vw solid #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>