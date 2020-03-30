<!-- eslint-disable vue/no-unused-components -->
<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-04 18:12:11
 * @LastEditTime: 2020-03-30 14:02:06
 * @FilePath: \indidea-frontend\src\views\EditDetail.vue
 * @Description: 
 -->
<template>
  <div class="ff7-cloud">
    <div :style="navFixed ? 'height: 64px' : ''"></div>
    <div :class="navFixed ? 'nav-cloud-fixed' : ''">
      <div class="nav-cloud" ref="fixedNav">
        <div @click="backTo" class="back-to">
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
          <Button @click="nextTo" class="ivu-card" :style="btnNext.color">
            {{ btnNext.name }}
          </Button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <router-view></router-view>
    </div>
    <div class="footer">Copyright Indidea © 2019-2020</div>
  </div>
</template>
<script>
export default {
  name: "EditDetail",
  data() {
    return {
      btnNext: {
        name: "下一个",
        color: "backgroundColor: #1c9482;"
      },
      paramsofPath: "",
      pathList: ["basicInfo", "rewardInfo", "storyInfo"],
      slideAni: "left: 0%;",
      editProjectData: { category: {} },
      categories: [],
      option: {
        img: "",
        size: 1,
        full: true,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: true,
        canMoveBox: true,
        autoCrop: true,
        centerBox: true,
        high: true,
        fixed: true,
        fixedNumber: [16, 9]
      },
      navFixed: false,
      optionsdate: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() + 86400000 * 7;
        }
      }
    };
  },
  methods: {
    nextTo() {
      let index = this.pathList.indexOf(this.paramsofPath);
      if (index !== this.pathList.length - 1) {
        this.$router.push("./" + this.pathList[++index]);
      }
    },
    handleBeforeUpload() {
      // if (this.editProjectData != null) {
      // }
    },
    watchScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // let navTop = this.$refs.fixedNav.getBoundingClientRect().top;
      if (scrollTop > 120) {
        this.navFixed = true;
      } else {
        this.navFixed = false;
      }
    },
    alertNotify() {
      alert("你确定要离开本页面吗？表单将不会保存");
    },
    backTo() {
      this.$router.push("/editProject/" + this.$route.params.projectId);
    }
  },
  computed: {
    canScale() {
      return this.option.img !== "";
    }
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
    window.addEventListener("beforeunload", this.alertNotify);
    let path = this.$route.name;
    this.paramsofPath = path;
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      let pathParams = to.name;
      this.paramsofPath = pathParams;
    }
  },
  components: {},
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  }
};
</script>
<style lang="scss" socped>
@import "../assets/css/editDetail.scss";
</style>
