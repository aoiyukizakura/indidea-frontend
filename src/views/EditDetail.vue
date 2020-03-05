<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-04 18:12:11
 * @LastEditTime: 2020-03-06 02:36:10
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
        <div class="basic-info">
          <!-- 头 -->
          <div class="info-header">
            <div>
              <Row type="flex" justify="center">
                <i-col span="16">
                  <div>
                    <h1>完善您想法的基本信息</h1>
                    <p>
                      其他用户通过这些信息，可以充分的了解该项目是否符合他们的期望
                    </p>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 头 -->
          <!-- 编辑标题 -->
          <div class="edit-title edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>创意名称</h2>
                  <p>撰写一个简洁明了的标题，能够吸引大家的注意力</p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <div class="edit-input-title">
                      <div>标题</div>
                      <Input
                        v-model="projectData.title"
                        size="large"
                        placeholder="2015年年度最佳游戏（提名）血缘开启第二作众筹辣"
                        :maxlength="60"
                        show-word-limit
                      />
                    </div>
                    <div class="edit-input-title">
                      <div>子标题/简介</div>
                      <Input
                        v-model="projectData.subtitle"
                        placeholder="如果你也想要自己为这份游戏贡献一部分力量，那就赶快行动，血缘卡丁车，你值得拥有"
                        type="textarea"
                        :rows="3"
                        :maxlength="135"
                        show-word-limit
                      />
                    </div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 编辑标题 -->
          <!-- 选择类别 -->
          <div class="edit-sort edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>选择分类</h2>
                  <p>选择一个与你想法最符合的分类</p>
                  <p>
                    如果你觉得你的想法不属于现有的任何一个分类，那么我们非常期待你的建议
                  </p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <div class="edit-input-sort">
                      <Select v-model="projectData.categoryId">
                        <Option
                          v-for="(item, index) in categories"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.name }}
                        </Option>
                      </Select>
                    </div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 选择类别 -->
          <!-- 选择封面 -->
          <div class="edit-cover edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>上传封面</h2>
                  <p>该封面最好是可以清晰展示您的观点或想法</p>
                  <p>
                    尽量避免竖着的图片，或者是太多文字的图片，因为这样的图片在略缩图的时候很难勾起用户的兴趣
                  </p>
                  <p>
                    你将要上传的图片会被裁剪成16：9
                  </p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <div class="edit-input-cover">
                      <vue-cropper
                        ref="cropper"
                        :img="option.img"
                        :output-size="option.size"
                        :output-type="option.outputType"
                        :info="false"
                        :full="option.full"
                        :fixed="option.fixed"
                        :fixed-number="option.fixedNumber"
                        :can-move="option.canMove"
                        :can-move-box="option.canMoveBox"
                        :fixed-box="option.fixedBox"
                        :original="option.original"
                        :auto-crop="option.autoCrop"
                        :auto-crop-width="option.autoCropWidth"
                        :auto-crop-height="option.autoCropHeight"
                        :center-box="option.centerBox"
                        :high="option.high"
                        mode="cover"
                      >
                      </vue-cropper>
                      <Button long @click="cropImg">上传</Button>
                    </div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 选择封面 -->
        </div>
        <div class="reward-info">
          <div class="info-header">
            <div>
              <Row type="flex" justify="center">
                <i-col span="16">
                  <div>
                    <h1>新增奖励阶梯</h1>
                    <p>
                      给支持者们提供一些简单的或者有意义的回报，
                      也可以是该项目本身，或者是一些特殊的待遇，
                      让他们出现在幕后名单上也许是不错的选择
                    </p>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
        <div class="story-info">
          <div class="info-header">
            <div>
              <Row type="flex" justify="center">
                <i-col span="16">
                  <div>
                    <h1>介绍您的想法</h1>
                    <p>
                      您可以将产生这个想法的经历或者是各种事情记录下来，
                      让支持者们感受到您的用心，也可以将其中有意思的小故事分享给大家。
                    </p>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/css/editDetail.scss";
// eslint-disable-next-line no-unused-vars
import { category, uploadFile } from "../services/api";
import { VueCropper } from "vue-cropper";
export default {
  name: "EditDetail",
  data: () => ({
    btnNext: {
      name: "保存",
      color: "backgroundColor: #1c9482;"
    },
    paramsofPath: "",
    pathList: ["basicInfo", "rewardInfo", "storyInfo"],
    slideAni: "left: 0%;",
    projectData: {},
    categories: [],
    option: {
      img: "/api/uploads/20200218153457991.jpg",
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
    }
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
    },
    cropImg() {
      this.$refs.cropper.getCropBlob(data => {
        // do something
        // eslint-disable-next-line no-unused-vars
        let file = new File([data], "img.png");
        let filedata = new FormData();
        filedata.append("file", file);
        uploadFile(filedata)
          .then(res => {
            console.log("res.data :", res.data);
          })
          .catch(err => {
            console.log("err :", err);
          });
      });
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
    category().then(res => {
      this.categories = res.data;
    });
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      let pathParams = to.params.path;
      this.paramsofPath = pathParams;
      this.slide2slide(pathParams);
    }
  },
  components: {
    VueCropper
  }
};
</script>
<style lang="scss" socped></style>
