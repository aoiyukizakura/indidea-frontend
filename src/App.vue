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
        <div @click="getstart">发起众筹</div>
      </i-col>
      <i-col :md="3" :sm="{ span: 12 }" :xs="12" class="nav-right">
        <div @click="search">
          搜索
          <Icon type="md-search" style="margin-left:5px;" />
        </div>
        <div @click="toLogin" v-show="!isLogin">登录</div>
        <div @click="openDrawer">
          <Avatar v-show="isLogin" :src="$url.imgUrl + avatar" />
        </div>
      </i-col>
    </Row>
    <router-view class="routerView"></router-view>
    <!-- <div class="footer">Copyright © 2019-2020</div> -->
    <Modal v-model="modal" title="注销" :loading="loading" @on-ok="logout">
      <p>确认登出？</p>
    </Modal>
    <Drawer :closable="false" width="360" v-model="show">
      <p class="pstyle">你的账户</p>
      <div class="drawer-profile">
        <Row>
          <i-col span="24">
            <router-link v-on:click.native="show = false" to="/saved-project"
              >已收藏的方案</router-link
            >
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <router-link v-on:click.native="show = false" to="/setting"
              >设定</router-link
            >
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <router-link v-on:click.native="show = false" to="/myInfo"
              >我的信息</router-link
            >
          </i-col>
        </Row>
      </div>
      <Divider />
      <p class="pstyle">我发起的方案</p>
      <div class="drawer-profile">
        <Row v-for="(project, index) in myProjects" :key="index">
          <i-col span="4">
            <img src="./assets/default.png" v-real-img="project.pic" />
          </i-col>
          <template
            v-if="
              project.status !== 1 &&
                project.status !== 5 &&
                project.status !== 6
            "
          >
            <i-col span="16" push="1">
              <router-link
                v-on:click.native="show = false"
                :to="'/editProject/' + project.id"
                >{{ project.category.name }} 的方案</router-link
              >
            </i-col>
            <Icon size="18" type="md-create" />
          </template>
          <template v-else>
            <i-col span="16" push="1">
              <router-link
                v-on:click.native="show = false"
                :to="'/project-detail/' + project.id"
                >{{ project.category.name }} 的方案</router-link
              >
            </i-col>
          </template>
        </Row>
      </div>
      <Divider />
      <div class="btn-create-project">
        <Tooltip
          style="width: 100%;"
          content="我也要来一发"
          theme="light"
          placement="top"
        >
          <Button type="info" @click="getstart" ghost long>
            <Icon size="16" type="md-add" />
          </Button>
        </Tooltip>
      </div>
      <div class="btn-logout">
        <Divider />
        <Button type="warning" @click="modal = true" ghost long>注销</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { TOKEN, USER_INFO, USER_DATA } from "./utils/Constants";
import { logout, getMyProjects } from "./services/api";
export default {
  name: "App",
  data: () => ({
    show: false,
    modal: false,
    loading: true,
    sort: {},
    myProjects: []
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
    openDrawer() {
      this.show = !this.show;
    },
    getstart() {
      this.show = false;
      if (USER_DATA.status === 2) this.$router.push(`/start`);
      else this.$Message.info("您还不是独立创意人，请先申请!");
    },
    search() {
      this.$router.push("/search");
    }
  },
  computed: {
    isLogin() {
      return localStorage.getItem(TOKEN) ? true : false;
    },
    avatar() {
      let user_info = localStorage.getItem(USER_INFO);
      if (user_info) {
        return JSON.parse(localStorage.getItem(USER_INFO)).avatar;
      } else {
        return null;
      }
    }
  },
  mounted() {
    if (this.isLogin)
      getMyProjects().then(res => {
        if (res.data) {
          this.myProjects = res.data;
        }
      });
  }
};
</script>

<style>
body,
html {
  scroll-behavior: smooth;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #2c3e50;
  /* margin-top: 60px; */
  scroll-behavior: smooth;
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
