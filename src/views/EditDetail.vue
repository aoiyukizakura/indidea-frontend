<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-04 18:12:11
 * @LastEditTime: 2020-03-05 00:40:56
 * @FilePath: \indidea-frontend\src\views\EditDetail.vue
 * @Description: 
 -->
<template>
  <div class="ff7-cloud">
    <div class="nav-cloud">
      <div class="back-to">
        <div>
          <Icon type="md-arrow-back" style="margin-right: 6px;" />
          返回项目概括
        </div>
      </div>
      <div class="main-container">
        <Menu mode="horizontal" :active-name="paramsofPath" theme="light">
          <MenuItem name="basicInfo" to="./basicInfo">
            <Icon size="16" type="ios-paper-plane" />
            基本信息
          </MenuItem>
          <MenuItem name="rewardInfo" to="./rewardInfo">
            <Icon size="16" type="md-medal" />
            奖励阶梯
          </MenuItem>
          <MenuItem name="storyInfo" to="./storyInfo">
            <Icon size="16" type="md-book" />
            创意故事
          </MenuItem>
        </Menu>
      </div>
      <div class="go-to">
        <Button
          @click="saveTo"
          v-if="projectFlag"
          class="ivu-card"
          :style="btnNext.color"
        >
          {{ btnNext.name }}
        </Button>
      </div>
    </div>
    <div class="main-content">
      <div class="slide-content" :style="slideAni">
        <div class="basic-info"></div>
        <div class="reward-info"></div>
        <div class="story-info"></div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/editDetail.scss";
export default {
  name: "EditDetail",
  data: () => ({
    btnNext: {
      name: "保存",
      color: "backgroundColor: #1c9482;"
    },
    paramsofPath: "",
    pathList: ["basicInfo", "rewardInfo", "storyInfo"],
    slideAni: "left: 0%;"
  }),
  methods: {
    nextTo() {
      let index = this.pathList.indexOf(this.paramsofPath);
      if (index !== this.pathList.length - 1) {
        this.$router.push("./" + this.pathList[++index]);
      }
    },
    saveTo() {
      // 更新的代码
    },
    slide2slide(path) {
      let index = this.pathList.indexOf(path);
      this.slideAni = "left: -" + index * 100 + "%;";
    }
  },
  computed: {
    projectFlag() {
      return false;
    }
  },
  mounted() {
    let path = this.$route.params.path;
    this.paramsofPath = path;
    this.slide2slide(path);
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      let pathParams = to.params.path;
      this.paramsofPath = pathParams;
      this.slide2slide(pathParams);
    }
  }
};
</script>
<style lang="scss" socped></style>
