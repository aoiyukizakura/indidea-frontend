<!-- eslint-disable no-unused-vars  -->
<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-19 12:06:15
 * @LastEditTime: 2020-03-19 19:21:58
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
                <div>
                  <img
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
                  <i-progress :stroke-width="8" :percent="25" hide-info />
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
                    <div><span>105</span></div>
                    <span>个支持者</span>
                  </div>
                  <div class="project-data-normal">
                    <div><span>25</span></div>
                    <span>天结束</span>
                  </div>
                </div>
                <div class="btn-project-group">
                  <Button long class="btn-project-support">
                    这就是最吼滴，支持
                  </Button>
                  <Button icon="md-heart-outline" long class="btn-project-save">
                    收藏
                  </Button>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
      <div class="project-content">
        <div class="project-content-menu">
          <div class="base-container">
            <Row>
              <i-col class="menu" span="16">
                <span class="menu-item active" to="./">项目背景</span>
                <span class="menu-item" to="./">问答环节</span>
                <span class="menu-item" to="./">更新日志</span>
                <span class="menu-item" to="./">留言</span>
              </i-col>
              <i-col span="8"></i-col>
            </Row>
          </div>
        </div>
        <div class="base-container"></div>
      </div>
    </main>
  </div>
</template>
<script>
import {} from "../../services/api";
import {
  // eslint-disable-next-line no-unused-vars
  rewardListByProjectId,
  // eslint-disable-next-line no-unused-vars
  getProjectById
} from "../../services/api/project";
export default {
  name: "ProjectDetail",
  data: () => ({
    pageProjectId: 0,
    projectData: { category: {}, owner: {} },
    projectReward: []
  }),
  methods: {
    getProject() {
      getProjectById(this.pageProjectId)
        .then(res => {
          if (res.data) {
            this.projectData = res.data;
            console.log("res.data :", res.data);
          }
        })
        .catch(e => {
          console.log("e :", e);
        });
      rewardListByProjectId(this.pageProjectId)
        .then(({ data }) => {
          if (data.length) {
            this.projectData = data;
          }
        })
        .catch(e => {
          console.log("e :", e);
        });
    }
  },
  computed: {},
  created() {
    this.pageProjectId = this.$route.params.projectId;
    this.getProject();
  },
  mounted() {},
  destroyed() {},
  watch: {
    $route(to) {
      this.pageProjectId = to.params.projectId;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/project/project-detail.scss";
</style>
