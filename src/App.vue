<template>
  <div id="app">
    <i-row class="nav">
      <i-col span="6">
        <span>发现</span>
        <span>发起众筹</span>
      </i-col>
      <i-col span="6">
        <img src="./assets/logo.png" />
      </i-col>
      <i-col span="6">
        <span><Icon type="md-search" />搜索</span>
        <span>登录</span>
      </i-col>
    </i-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
