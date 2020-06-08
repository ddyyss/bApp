<template>
  <div id="app">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="less">
html,body{
  padding: 0;
  margin: 0;
  background-color: 	#F5F5F5;
  box-sizing: border-box;
}
p{
  margin: 0;
}
</style>
