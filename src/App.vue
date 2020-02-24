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
        <div>搜索<Icon type="md-search" style="margin-left:5px;" /></div>
        <div @click="toLogin" v-show="!isLogin">登录</div>
        <div @click="show = !show">
          <Avatar v-show="isLogin" :src="$url.imgUrl + avatar" />
        </div>
      </i-col>
    </Row>
    <Drawer :closable="false" width="640" v-model="show">
      <p :style="pStyle">User Profile</p>
      <p :style="pStyle">Personal</p>
      <div class="demo-drawer-profile">
        <Row>
          <i-col span="12">
            Full Name: Aresn
          </i-col>
          <i-col span="12">
            Account: aresn@aresn.com
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            City: BeiJing
          </i-col>
          <i-col span="12">
            Country: China
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            Birthday: May 14, 1991
          </i-col>
          <i-col span="12">
            Website:
            <a href="https://dev.iviewui.com" target="_blank"
              >https://dev.iviewui.com</a
            >
          </i-col>
        </Row>
        Message: Hello, Developer
      </div>
      <Divider />
      <p :style="pStyle">Company</p>
      <div class="demo-drawer-profile">
        <Row>
          <i-col span="12">
            Position: Programmer
          </i-col>
          <i-col span="12">
            Responsibilities:Coding
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            Department: Map visualization
          </i-col>
        </Row>
        Skills:C / C + +, data structures, software engineering, operating
        systems, computer networks, databases, compiler theory, computer
        architecture, Microcomputer Principle and Interface Technology, Computer
        English, Java, ASP, etc.
      </div>
      <Divider />
      <p :style="pStyle">Contacts</p>
      <div class="demo-drawer-profile">
        <Row>
          <i-col span="12">
            Email: admin@aresn.com
          </i-col>
          <i-col span="12">
            Phone Number: +86 18888888888
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            GitHub:
            <a href="https://github.com/view-design/ViewUI" target="_blank"
              >https://github.com/view-design/ViewUI</a
            >
          </i-col>
        </Row>
      </div>
    </Drawer>
    <router-view></router-view>
    <div class="footer">
      Copyright © 2019-2020
    </div>
  </div>
</template>

<script>
import { TOKEN, USER_INFO } from "./utils/Constants";
export default {
  name: "App",
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    logout() {
      localStorage.removeItem(TOKEN);
    }
  },
  data: () => ({
    show: true,
    pStyle: {
      fontSize: "16px",
      color: "rgba(0,0,0,0.85)",
      lineHeight: "24px",
      display: "block",
      marginBottom: "16px"
    }
  }),
  computed: {
    isLogin() {
      return localStorage.getItem(TOKEN) ? true : false;
    },
    avatar() {
      return JSON.parse(localStorage.getItem(USER_INFO)).avatar;
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
  background-color: white;
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
  padding: 12px 0 12px 24px;
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
  padding: 12px 24px 12px 0;
  border-bottom: 1px solid #dcdee2;
  line-height: 43px;
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
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
</style>
