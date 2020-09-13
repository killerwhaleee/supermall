<template>
  <div id="app">
    <keep-alive exclude="Detail">
<!--      Detail排除在外 否则一直是同一个数据 不从新created-->
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
