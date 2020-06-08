<template>
  <div>
    <van-cell-group>
      <van-field v-model="value" :label="label" :placeholder='"请输入"+label' :type="type" :rule="rule" @input="handleInput"/>
    </van-cell-group>
  </div>
</template>


<script>
export default {
  name: "LoginText",
  components: {},
  props: {
    label:String,
    type:String,
    rule:String
  },
  data() {
    return {
      value:''
    };
  },
  watch: {
  },
  computed: {},
  methods: {
    handleInput(){
      const rule=new RegExp(this.rule)
      if(rule.test(this.value)){
        this.$emit('inputSuccess',this.value)
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>