<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-27 21:52:50
 * @LastEditTime: 2020-03-29 13:49:07
 * @FilePath: \indidea-frontend\src\views\User\User.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="my-info">
      <Row class="my-info-content">
        <i-col span="6">
          <div class="avatar">
            <img
              @click="jumpToInfo"
              src="../../assets/default.png"
              alt="avatar"
              v-real-img="userInfo.avatar"
              tabindex="1"
              ref="img"
            />
            <div
              :class="
                (myinfo_show ? 'opacity-1' : 'opacity-0') +
                  ' focus-line ' +
                  (myinfo_running ? 'running' : 'paused')
              "
            ></div>
            <div
              :class="
                (myinfo_show ? 'opacity-1' : 'opacity-0') +
                  ' focus-line-2 ' +
                  (myinfo_running ? 'running' : 'paused')
              "
            ></div>
          </div>
          <Menu class="my-info-menu" width="auto" :active-name="active">
            <div class="my-info-data">
              <div>{{ userInfo.username }}</div>
              <span>已支持过 {{ suppotNum }} 次项目</span>
            </div>
            <MenuGroup title="项目">
              <MenuItem name="saved-project" to="saved-project">
                <Icon type="md-heart" />
                已收藏
              </MenuItem>
              <MenuItem name="user-support" to="user-support">
                <Icon type="md-leaf" />
                已赞助
              </MenuItem>
              <MenuItem name="setting" to="setting">
                <Icon type="md-leaf" />
                我发起的
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="积分">
              <MenuItem name="point-history" to="point-history">
                <Icon type="md-document" />
                积分记录
              </MenuItem>
              <MenuItem name="top-up" to="top-up">
                <Icon type="md-chatbubbles" />
                积分充值
              </MenuItem>
            </MenuGroup>
          </Menu>
        </i-col>
        <i-col style="padding-top: 36px" span="17" offset="1">
          <router-view v-if="routerAlive"></router-view>
        </i-col>
      </Row>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../../components/Footer/Footer";
import { myInfo, supportNum } from "../../services/api/user";
export default {
  name: "User",
  components: {
    Footer
  },
  data: () => ({
    active: "myInfo",
    myinfo_show: false,
    myinfo_running: false,
    routerAlive: true,
    userInfo: "",
    suppotNum: 0
  }),
  methods: {
    initPageByRoute(route) {
      let name = route.name;
      this.getMyInfo();
      this.getSupportNum();
      if (name === "myInfo") {
        this.active = "";
        this.myinfo_show = true;
      } else {
        this.active = name;
        this.myinfo_show = false;
      }
    },
    jumpToInfo() {
      if (this.$route.name === "myInfo") {
        this.reloadPage();
      } else {
        this.$router.push("myInfo");
      }
      this.myinfo_show = true;
      this.myinfo_running = true;
      setTimeout(() => {
        this.myinfo_running = false;
        this.$refs["img"].blur();
      }, 2000);
    },
    reloadPage() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
    getMyInfo() {
      myInfo().then(res => {
        if (res.data) this.userInfo = res.data;
      });
    },
    getSupportNum() {
      supportNum().then(res => {
        if (res.data) this.suppotNum = res.data;
      });
    }
  },
  created() {
    this.initPageByRoute(this.$route);
  },
  watch: {
    $route(to, from) {
      if (to.name === from.name) {
        this.reloadPage();
      } else {
        this.initPageByRoute(to);
      }
    }
  },
  destroyed() {}
};
</script>
<style lang="scss" scoped>
html,
body {
  background-color: #fafafa;
}
.my-info {
  max-width: 1366px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 18px;
  padding: 60px;
  &-content {
    // border: 1px solid #efefef;
    min-height: 520px;
    .ivu-col {
      padding: 0 18px;
    }
    .avatar {
      height: 36px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 10;
      img {
        cursor: pointer;
        position: absolute;
        top: 0;
        z-index: 15;
        padding: 2px;
        height: 72px;
        width: 72px;
        background-color: transparent;
        object-fit: cover;
        border-radius: 100%;
        transition: all 200ms;
        // border: 0.5px solid rgba($color: #858282, $alpha: 0.2);
        &:hover {
          transform: scale(0.9);
        }
        &:focus {
          transition-delay: 2s;
          outline: none;
        }
      }
      .opacity-0 {
        opacity: 0 !important;
      }
      .opacity-1 {
        opacity: 1 !important;
      }
      .paused {
        animation-play-state: paused !important;
      }
      .running {
        animation-play-state: running !important;
      }
      .focus-line {
        border-radius: 100%;
        height: 74px;
        width: 74px;
        position: absolute;
        top: -1px;
        z-index: 11;
        transition: all 500ms;
        border-top: 1.5px solid #2773c4;
        border-bottom: 1.5px solid #2773c4;
        transform: rotate(25deg);
        animation: 1s ease-in-out reverse infinite turn;
      }
      .focus-line-2 {
        border-radius: 150%;
        height: 84px;
        width: 84px;
        position: absolute;
        top: -6px;
        z-index: 12;
        transition: all 500ms;
        border-left: 1.5px solid #2d8cf0;
        border-right: 1.5px solid #2d8cf0;
        transform: rotate(15deg);
        animation: 1s linear infinite turn;
      }
      @keyframes turn {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
  &-data {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 12px;
    flex-wrap: wrap;
    div {
      width: 100%;
      text-align: center;
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
      color: #282828;
    }
    span {
      padding-top: 6px;
      font-size: 13px;
      line-height: 24px;
      color: #656969;
    }
  }
  &-menu {
    padding-top: 48px;
    border: 1px solid #dcdee2;
    padding-bottom: 36px;
    z-index: 9;
    &::after {
      width: 0 !important;
    }
  }
}
</style>
