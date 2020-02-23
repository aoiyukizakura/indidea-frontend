<template>
  <div id="app">
    <Row class="nav">
      <i-col
        :md="{ span: 18, push: 3 }"
        :sm="{ span: 24 }"
        :xs="24"
        class="logo"
      >
        <img @click="$router.push('/')" src="./assets/text-logo.png" />
      </i-col>
      <i-col
        :md="{ span: 3, pull: 18 }"
        :sm="{ span: 12 }"
        :xs="12"
        class="left-nav"
      >
        <div>发现</div>
        <div>发起众筹</div>
      </i-col>
      <i-col :md="3" :sm="{ span: 12 }" :xs="12" class="nav-right">
        <div>搜索<Icon type="md-search" /></div>
        <div @click="toLogin">登录</div>
      </i-col>
    </Row>
    <router-view></router-view>
    <div class="footer">
      Copyright © 2019-2020
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.border {
  border: 1px solid #dcdee2;
}
.nav {
  height: 67px;
  width: 100%;
}
.logo > img {
  height: 34px;
  cursor: pointer;
}
.logo {
  text-align: center;
  border-bottom: 1px solid #dcdee2;
  height: 67px;
  display: flex !important;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
.left-nav {
  height: 67px;
  display: flex !important;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #dcdee2;
}

.left-nav > div {
  /* width: 50%; */
  float: left;
  line-height: 37px;
  font-size: 15px;
  margin-left: 15px;
  cursor: pointer;
}
.nav-right {
  height: 67px;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #dcdee2;
}
.nav-right > div {
  float: left;
  line-height: 37px;
  font-size: 15px;
  margin-left: 25px;
  cursor: pointer;
}
.footer {
  border-top: 1px solid #dcdee2;
  border-bottom: 1px solid #dcdee2;
  text-align: center;
  height: 5rem;
  line-height: 5rem;
}
</style>
