<!-- eslint-disable no-unused-vars  -->
<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-19 12:06:15
 * @LastEditTime: 2020-03-30 14:03:45
 * @FilePath: \indidea-frontend\src\views\ProjectDetail\ProjectDetail.vue
 * @Description: 
 -->
<template>
  <div>
    <main>
      <div class="project-header">
        <div>
          <div class="base-container">
            <Row class="project-header-title-row">
              <i-col span="24">
                <div>
                  <h2>{{ projectData.title }}</h2>
                  <p>{{ projectData.subtitle }}</p>
                </div>
              </i-col>
            </Row>
            <Row class="project-header-data-row">
              <i-col class="media" span="16">
                <div class="media-img">
                  <div
                    v-if="projectData.video && !videoVisible"
                    @click="playVideo"
                    class="media-play"
                  >
                    <Icon type="md-play" /> 播放
                  </div>
                  <video
                    :src="'/api/uploads/' + projectData.video"
                    v-if="videoVisible"
                    controls
                    ref="video"
                  ></video>
                  <img
                    v-if="!videoVisible"
                    src="../../assets/default.png"
                    v-real-img="projectData.pic"
                  />
                </div>
                <div>
                  <span>
                    <Icon size="18" type="md-bonfire" />
                    {{ projectData.hittime }}
                  </span>
                  <span>
                    <Icon size="18" type="md-apps" />
                    {{ projectData.category ? projectData.category.name : "-" }}
                  </span>
                </div>
              </i-col>
              <i-col class="data" span="8">
                <div class="progress">
                  <i-progress
                    :stroke-width="8"
                    :percent="projectPercent"
                    hide-info
                    stroke-color="#1c9482"
                  />
                </div>
                <div class="project-data">
                  <div class="project-data-point">
                    <div>
                      <span> Pt. {{ projectData.getpoint }} </span>
                    </div>
                    <span>
                      已筹集（目标点数 Pt. {{ projectData.targetpoint }}）
                    </span>
                  </div>
                  <div class="project-data-normal">
                    <div>
                      <span>{{ sponsorNum }}</span>
                    </div>
                    <span>次被支持</span>
                  </div>
                  <div class="project-data-normal">
                    <template v-if="endDay >= 0">
                      <div>
                        <span> {{ endDay }} </span>
                      </div>
                      <span>天结束</span>
                    </template>
                    <template v-else>
                      <div>
                        <span>已结束</span>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="btn-project-group">
                  <Button
                    long
                    class="btn-project-support"
                    @click="jumpToSupport"
                    :loading="jumpToLoading"
                    v-if="endDay >= 0"
                  >
                    这就是最吼滴，支持
                  </Button>
                  <Button
                    long
                    disabled
                    class="btn-project-support-disabled"
                    v-else
                  >
                    项目已结束
                  </Button>
                  <Button
                    icon="md-heart-outline"
                    long
                    :class="'btn-project-save ' + (projectSave ? 'border' : '')"
                    @click="doSave"
                  >
                    {{ projectSave ? "已收藏" : "收藏" }}
                  </Button>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
      <div ref="projectContentMenu" class="project-content">
        <div :class="'project-content-menu ' + (menuFixed ? 'fixed-menu' : '')">
          <div class="base-container">
            <Row>
              <i-col class="menu" span="16">
                <span
                  v-for="item in menuList"
                  :key="item.id"
                  @click="goTo(item.path)"
                  :class="
                    'menu-item ' +
                      (item.path === thisPageMenuName ? ' active' : ' ')
                  "
                >
                  {{ item.name }}
                </span>
              </i-col>
              <i-col span="8">
                <!-- TODO: !上滑出现按钮 -->
              </i-col>
            </Row>
          </div>
        </div>
        <div :class="menuFixed ? 'fill-content' : ''"></div>
        <div class="project-content-main">
          <div class="base-container project-container">
            <router-view @refresh="initPageByRoute"></router-view>
          </div>
        </div>
      </div>

      <BackTop v-if="menuFixed"></BackTop>
      <Footer></Footer>
    </main>
  </div>
</template>
<script>
import {} from "../../services/api";

import Footer from "@/components/Footer/Footer";
// import $ from "jquery";
import {
  // eslint-disable-next-line no-unused-vars
  rewardListByProjectId,
  // eslint-disable-next-line no-unused-vars
  getProjectById,
  countSponsorByProjectId,
  saveStatus,
  saveProject,
  getProjectWithoutHit
} from "../../services/api/project";
import { USER_LOGIN } from "../../utils/FunctionUtils";
export default {
  name: "ProjectDetail",
  data() {
    return {
      pageProjectId: 0,
      projectData: { category: {}, owner: {} },
      projectReward: [],
      menuList: [
        {
          id: 1,
          name: "项目背景",
          path: "Story"
        },
        {
          id: 2,
          name: "问答环节",
          path: "FQA"
        },
        {
          id: 3,
          name: "更新日志",
          path: "Log"
        },
        {
          id: 4,
          name: "留言板",
          path: "Msgboard"
        }
      ],
      thisPageMenuName: "Story",
      menuFixed: false,
      sponsorNum: 0,
      videoVisible: false,
      projectSave: false,
      jumpToLoading: false
    };
  },
  methods: {
    getProject(flag) {
      if (flag) {
        getProjectById(this.pageProjectId)
          .then(res => {
            if (res.data) this.projectData = res.data;
          })
          .catch(e => {
            console.log("e :", e);
          });
      } else {
        getProjectWithoutHit(this.pageProjectId).then(res => {
          if (res.data) this.projectData = res.data;
        });
      }
    },
    countSponsorByProjectId() {
      countSponsorByProjectId(this.pageProjectId).then(res => {
        if (res.data) {
          this.sponsorNum = res.data;
        }
      });
    },
    saveStatus() {
      if (USER_LOGIN()) {
        saveStatus(this.pageProjectId).then(res => {
          this.projectSave = res.data;
        });
      }
    },
    doSave() {
      if (USER_LOGIN()) {
        if (this.projectSave) {
          saveProject(this.pageProjectId, 0).then(res => {
            if (res.data) this.saveStatus();
          });
        } else {
          saveProject(this.pageProjectId, 1).then(res => {
            if (res.data) this.saveStatus();
          });
        }
      } else {
        this.$Message.info({
          content: "请登录后操作",
          duration: 1,
          closable: true,
          onClose: () => {
            console.log("coloes :");
          }
        });
        this.$router.push("/login");
      }
    },
    watchScroll() {
      let navTop;
      if (this.$refs.projectContentMenu) {
        navTop = parseInt(
          this.$refs.projectContentMenu.getBoundingClientRect().top
        );
      }
      if (navTop < 0) {
        this.menuFixed = true;
      } else {
        this.menuFixed = false;
      }
    },
    initPageByRoute(route, flag) {
      this.pageProjectId = route.params.projectId;
      this.thisPageMenuName = route.name;
      this.getProject(flag);
      this.countSponsorByProjectId();
      this.saveStatus();
    },
    // eslint-disable-next-line no-unused-vars
    goTo(path) {
      this.$router.push({
        name: path
      });
    },
    playVideo() {
      this.videoVisible = true;
      this.$Message.info("已为您静音播放");
      this.$nextTick(() => {
        this.$refs["video"].muted = true;
        this.$refs["video"].play();
      });
    },
    jumpToSupport() {
      let route = this.$route;
      this.jumpToLoading = true;
      if (route.name !== "Story") {
        this.$router.push({
          name: "Story"
        });
      }
      setTimeout(() => {
        this.jumpToLoading = false;
        this.$refs.projectContentMenu.scrollIntoView();
      }, 500);
    }
  },
  computed: {
    projectPercent() {
      let percent = parseInt(
        (this.projectData.getpoint / this.projectData.targetpoint) * 100
      );
      return percent > 100 ? 100 : percent;
    },
    endDay() {
      if (this.projectData.targetdate) {
        let start = new Date();
        let end = new Date(this.projectData.targetdate);
        let day = (end - start) / (1000 * 60 * 60 * 24);
        return parseInt(day);
      }
      return 0;
    }
  },
  created() {
    this.initPageByRoute(this.$route, true);
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  },
  watch: {
    $route(to) {
      this.initPageByRoute(to);
      this.$nextTick(() => {
        if (this.$refs.video) this.$refs.video.pause();
      });
    }
  },
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/project/project-detail.scss";
</style>
