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

    <div class="sort">
      <Row type="flex" justify="center">
        <template v-for="(category, index) in categories">
          <i-col span="2" :key="index">
            <p style="text-align: center;">
              <router-link class="hvr-outline-out" :to="'/sort/' + category.id">
                {{ category.name }}
              </router-link>
            </p>
          </i-col>
        </template>
      </Row>
    </div>

    <router-view class="routerView"></router-view>
    <div class="footer">
      Copyright © 2019-2020
    </div>
    <Modal v-model="modal" title="注销" :loading="loading" @on-ok="logout">
      <p>确认登出？</p>
    </Modal>
    <Drawer :closable="false" width="360" v-model="show">
      <p class="pstyle">你的账户</p>
      <div class="drawer-profile">
        <Row>
          <i-col span="24">
            <router-link to="/savedProject">已保存的方案</router-link>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <router-link to="/setting">设定</router-link>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <router-link to="/myInfo">我的信息</router-link>
          </i-col>
        </Row>
      </div>
      <Divider />
      <p class="pstyle">我发起的方案</p>
      <div class="drawer-profile">
        <Row>
          <i-col span="4">
            <img src="./assets/logo.png" />
          </i-col>
          <i-col span="16" push="1">
            <router-link to="/editproject">某某类型专案</router-link>
          </i-col>
        </Row>
      </div>
      <div class="btn-logout">
        <Divider />
        <Button type="warning" @click="modal = true" ghost long>注销</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { TOKEN, USER_INFO } from "./utils/Constants";
import { logout, category } from "./services/api";
export default {
  name: "App",
  data: () => ({
    show: false,
    modal: false,
    loading: true,
    sort: {},
    categories: []
  }),
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    logout() {
      logout().then(res => {
        if (res.data) {
          localStorage.removeItem(TOKEN);
        } else {
          this.$Message.info("网络异常，请稍后再试");
        }
        setTimeout(() => {
          this.modal = false;
          location.href = "/";
        }, 1000);
      });
    },
    sortTrigger() {
      if (this.sort.height === "0") {
        this.sort.height = "50px";
      } else {
        this.sort.height = "0";
      }
    }
  },
  computed: {
    isLogin() {
      return localStorage.getItem(TOKEN) ? true : false;
    },
    avatar() {
      return JSON.parse(localStorage.getItem(USER_INFO)).avatar;
    }
  },
  mounted() {
    category().then(res => {
      this.categories = res.data;
    });
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
.drawer-profile {
  font-size: 14px;
  margin-top: 2.4rem;
}
.drawer-profile a {
  color: #000;
  width: 100%;
}
.drawer-profile a:hover {
  text-decoration: #2d8cf0;
  text-decoration-line: underline;
}
.drawer-profile:first-of-type .ivu-col {
  margin-bottom: 12px;
}
.drawer-profile:nth-of-type(3) {
  line-height: 2rem;
}
.drawer-profile:nth-of-type(3) img {
  height: 2rem;
  width: 100%;
  background-color: #2c3e50;
  cursor: pointer;
}
.btn-logout {
  position: absolute;
  bottom: 2rem;
  width: 90%;
}
.sort {
  height: 4rem;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 4rem;
  border-bottom: 1px solid #dcdee2;
  font-size: 1rem;
  padding: 0 5rem;
  background-color: white;
}
.pstyle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  display: block;
  margin-bottom: 16px;
  font-weight: 550;
}
.hvr-outline-out {
  display: inline !important;
  color: #656969;
  font-weight: 550;
}
.hvr-outline-out:before {
  border: none !important;
}
.hvr-outline-out:hover:before {
  border-bottom: 2px solid !important;
}
.hvr-outline-out:hover {
  color: #656969;
}
</style>
