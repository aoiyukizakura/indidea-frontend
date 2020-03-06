<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-04 18:12:11
 * @LastEditTime: 2020-03-06 21:24:11
 * @FilePath: \indidea-frontend\src\views\EditDetail.vue
 * @Description: 
 -->
<template>
  <div class="ff7-cloud">
    <div :class="navFixed ? 'nav-cloud-fixed' : ''">
      <div class="nav-cloud" ref="fixedNav">
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
                        v-model="editProjectData.title"
                        size="large"
                        placeholder="2015年年度最佳游戏（提名）血缘开启第二作众筹辣"
                        :maxlength="60"
                        show-word-limit
                      />
                    </div>
                    <div class="edit-input-title">
                      <div>子标题/简介</div>
                      <Input
                        v-model="editProjectData.subtitle"
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
                      <Select v-model="editProjectData.category.id">
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
                    <div v-if="!editProjectData.pic" class="edit-input-cover">
                      <div class="edit-input-cover-cropper">
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
                          :can-scale="canScale"
                          mode="cover"
                        >
                        </vue-cropper>
                      </div>
                      <input
                        ref="selectImg"
                        type="file"
                        hidden
                        @change="changeImg"
                        accept="image/jpg,image/png"
                      />
                      <Button type="success" long @click="cropImg">
                        上传
                      </Button>
                    </div>
                    <div v-else class="edit-input-cover">
                      <img
                        src="../assets/default.png"
                        v-real-img="editProjectData.pic"
                        class="pre-img"
                      />
                      <Button type="error" long @click="clearImg">
                        重新选择
                      </Button>
                    </div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 选择封面 -->
          <!-- 选择视频 -->
          <div class="edit-video edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>选择一个视频（非必要）</h2>
                  <p>为您的想法拍摄一支视频</p>
                  <p>
                    或者是一个你们想法的成果物的展示视频，这个视频可以告诉支持者们您心中的作品等等。
                  </p>
                  <p>
                    只支持MP4格式
                  </p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <Upload
                      v-if="
                        editProjectData.video === null ||
                          editProjectData.video === ''
                      "
                      class="edit-input-upload-video"
                      type="drag"
                      action="/api/uploadFile"
                      name="file"
                      :on-success="videoUploaded"
                      :on-remove="videoRemove"
                      :before-upload="handleBeforeUpload"
                      :format="['mp4']"
                      accept="video/mp4"
                    >
                      <div style="padding: 20px 0">
                        <Icon
                          type="ios-cloud-upload"
                          size="52"
                          style="color: #1c9482"
                        ></Icon>
                        <p>点击或者拖拽上传</p>
                      </div>
                    </Upload>
                    <div class="edit-input-pre-video" v-else>
                      <video
                        :src="'/api/uploads/' + editProjectData.video"
                        controls
                      ></video>
                      <Button long type="error" @click="videoRemove">
                        重新选择
                      </Button>
                    </div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 选择视频 -->
          <!-- 筹集金额 -->
          <div class="edit-video edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>筹款目标</h2>
                  <p>给您的项目定下一个金额。</p>
                  <p>
                    我们建议您将要求金额调配得稍微低一点，因为如果该项目没有筹集到目标金额，您将不会得到任何东西。
                  </p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <div class="edit-input-title">
                      <div>目标金额</div>
                      <i-input
                        v-model="editProjectData.targetpoint"
                        size="large"
                      >
                        <Icon type="md-trophy" slot="prefix" />
                      </i-input>
                    </div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 筹集金额 -->
          <!-- 预计结束时间 -->
          <div class="edit-video edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>筹集项目的持续时间</h2>
                  <p>为你的项目拟定一个期限</p>
                  <p style="color:red;">
                    注意：这个期限在发布之后不能够再次修改，请谨慎选择
                  </p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <DatePicker
                      type="date"
                      size="large"
                      :options="optionsdate"
                      placeholder="Select date"
                      @on-change="targetdate"
                    ></DatePicker>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 预计结束时间 -->
          <!-- 预计发布日期（可选） -->
          <div class="edit-video edit-content">
            <div>
              <Row type="flex" justify="center" align="top">
                <i-col span="8">
                  <h2>预计发售日期（非必要）</h2>
                  <p>
                    如果您的想法需要一个发售日期，那么我们建议您再次选上，好让支持者们心里有个着落。
                  </p>
                  <p>
                    有这个承诺，筹集的效果会更好。
                  </p>
                </i-col>
                <i-col class="edit-input" offset="2" span="14">
                  <div>
                    <DatePicker
                      type="date"
                      size="large"
                      :options="optionsdate"
                      placeholder="Select date"
                      @on-change="predate"
                    ></DatePicker>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
          <!-- 预计发布日期（可选） -->
          <Button long type="success" @click="check">检查</Button>
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
import {
  category,
  uploadFile,
  getProjectByFlagById,
  deleteFile,
  updateProject
} from "../services/api";
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
    projectData: { category: {} },
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
      if (this.option.img === "" || this.option.img === null) {
        this.$refs.selectImg.click();
      } else {
        this.$refs.cropper.getCropBlob(data => {
          // do something
          // eslint-disable-next-line no-unused-vars
          let file = new File([data], "img.png");
          let filedata = new FormData();
          filedata.append("file", file);
          uploadFile(filedata)
            .then(res => {
              this.editProjectData.pic = res.data;
            })
            .catch(err => {
              console.log("err :", err);
            });
        });
      }
    },
    clearImg() {
      this.$Modal.confirm({
        title: "你确定要移除图片吗",
        content: "<p>该操作不可恢复，请谨慎删除</p>",
        onOk: () => {
          this.$Spin.show();
          deleteFile(this.editProjectData.pic);
          this.editProjectData.pic = null;
          this.option.img = null;
          updateProject({
            pic: "",
            id: this.projectData.id
          });
          setTimeout(() => {
            this.$Message.success("成功移除");
            this.$Spin.hide();
          }, 500);
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    changeImg(event) {
      let img = event.target.files[0];
      if (img) {
        const fr = new FileReader(img);
        fr.readAsDataURL(img);
        const $this = this;
        fr.onload = function() {
          $this.option.img = this.result;
        };
      }
    },
    // eslint-disable-next-line no-unused-vars
    videoUploaded(response, file, fileList) {
      this.editProjectData.video = response.data;
    },
    videoRemove() {
      this.$Modal.confirm({
        title: "你确认要移除视频吗？",
        content: "<p>视频被移除后不可以撤回</p>",
        onOk: () => {
          this.$Spin.show();
          deleteFile(this.editProjectData.video);
          this.editProjectData.video = null;
          updateProject({
            video: "",
            id: this.projectData.id
          });
          setTimeout(() => {
            this.$Message.info("成功移除");
            this.$Spin.hide();
          }, 1000);
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
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
    check() {
      console.log("object :", this.editProjectData);
    },
    targetdate(a) {
      this.editProjectData.targetdate = new Date(a);
    },
    predate(a) {
      this.editProjectData.perdate = new Date(a);
    }
  },
  computed: {
    projectFlag() {
      return (
        JSON.stringify(this.projectData) !==
        JSON.stringify(this.editProjectData)
      );
    },
    canScale() {
      return this.option.img !== "";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
    let path = this.$route.params.path;
    this.paramsofPath = path;
    this.slide2slide(path);
    category().then(res => {
      this.categories = res.data;
    });
    getProjectByFlagById({
      projectId: this.$route.params.projectId,
      flag: 0
    }).then(res => {
      this.projectData = res.data;
      this.editProjectData = JSON.parse(JSON.stringify(res.data));
      if (
        res.data.status === 1 &&
        res.data.status === 5 &&
        res.data.status === 6
      ) {
        this.$router.replace("/projectDetail/" + res.data.id);
      }
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
  },
  destroyed() {
    window.removeEventListener("scroll", this.watchScroll);
  }
};
</script>
<style lang="scss" socped></style>
