<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-03 11:40:56
 * @LastEditTime: 2020-03-16 23:04:32
 * @FilePath: \indidea-frontend\src\views\EditProject.vue
 * @Description: 详细编辑project
 -->
<template>
  <div class="basic-div">
    <div class="edit-header">
      <div class="max-grid-container">
        <Row class="edit-header-row">
          <i-col span="24">
            <div>
              <h2>{{ projectData.category.name }} 想法</h2>
              <p>{{ projectData.subtitle }}</p>
              <h3>发起人：{{ projectData.owner.username }}</h3>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
    <Divider />
    <div class="main-content">
      <div class="max-grid-container">
        <Row class="main-content-row">
          <i-col span="24">
            <div class="row">
              <div class="col">
                <div class="col-content-content">
                  <h3>项目总览</h3>
                  <!-- 三条总 -->
                  <!-- 第一条 -->
                  <div @click="toEditDatail('basicInfo')" class="ivu-card">
                    <i-circle
                      :percent="basicPercent"
                      :stroke-color="basicColor.color"
                      :size="48"
                      :trail-width="4"
                      :stroke-width="4"
                    >
                      <Icon
                        type="ios-checkmark"
                        :size="36"
                        :style="basicColor.iconColor + 'font-weight:600;'"
                      ></Icon>
                    </i-circle>
                    <div>
                      <p>{{ listData[0].title }}</p>
                      <p>{{ listData[0].subtitle }}</p>
                    </div>
                  </div>
                  <!-- 第一条 -->
                  <div @click="toEditDatail('rewardInfo')" class="ivu-card">
                    <i-circle
                      :percent="rewardPercent"
                      :stroke-color="rewardColor.color"
                      :size="48"
                      :trail-width="4"
                      :stroke-width="4"
                    >
                      <Icon
                        type="ios-checkmark"
                        :size="36"
                        :style="rewardColor.iconColor + 'font-weight:600;'"
                      ></Icon>
                    </i-circle>
                    <div>
                      <p>{{ listData[1].title }}</p>
                      <p>{{ listData[1].subtitle }}</p>
                    </div>
                  </div>
                  <div @click="toEditDatail('storyInfo')" class="ivu-card">
                    <i-circle
                      :percent="storyPercent"
                      :stroke-color="storyColor.color"
                      :size="48"
                      :trail-width="4"
                      :stroke-width="4"
                    >
                      <Icon
                        type="ios-checkmark"
                        :size="36"
                        :style="storyColor.iconColor + 'font-weight:600;'"
                      ></Icon>
                    </i-circle>
                    <div>
                      <p>{{ listData[2].title }}</p>
                      <p>{{ listData[2].subtitle }}</p>
                    </div>
                  </div>
                  <!-- 三条总 -->
                  <!-- steps -->
                  <div class="content-steps">
                    <div></div>
                    <div></div>
                    <Steps direction="vertical">
                      <Step
                        title="等待完成"
                        content="编辑完毕之后可以提交审核"
                        icon="ios-information-circle"
                        v-if="!allDone"
                        status="wait"
                      ></Step>
                      <Step
                        title="全部完成"
                        content="现在可以将该方案提交给管理员审核了"
                        icon="ios-checkmark-circle"
                        v-if="allDone && projectData.status === 0"
                        status="finish"
                        class="success-steps"
                      >
                      </Step>
                      <Step
                        title="已成功提交项目"
                        content="如果您觉得还有地方需要修改，可以点击下方按钮，撤回申请。重新编辑"
                        icon="ios-checkmark-circle"
                        v-if="
                          projectData.status === 2 || projectData.status === 7
                        "
                        status="finish"
                        class="success-steps"
                      >
                      </Step>
                      <Step
                        title="项目被管理员驳回"
                        content="如果您觉得有哪些地方还有疑问，可以给管理员(xuqiuhan16@dnui.edu.cn)发送邮件，或者重新编辑"
                        icon="md-close-circle"
                        v-if="projectData.status === 3"
                        status="error"
                      >
                      </Step>
                    </Steps>
                  </div>
                  <!-- steps -->
                  <!-- 提交按钮 -->
                  <div class="submit-btn">
                    <Button
                      v-if="projectData.status === 0"
                      :disabled="!allDone"
                      size="large"
                      long
                      @click="submitToCheck"
                    >
                      提交
                    </Button>
                    <Button
                      v-if="
                        projectData.status === 7 ||
                          projectData.status === 2 ||
                          projectData.status === 3
                      "
                      size="large"
                      long
                      @click="back2Edit"
                    >
                      重新编辑
                    </Button>
                  </div>
                  <!-- 提交按钮 -->
                  <!-- 提交之后等待审核 -->
                  <div
                    v-if="projectData.status === 7 || projectData.status === 2"
                    class="wait-process"
                  >
                    <div></div>
                    <div class="ivu-card">
                      <i-circle
                        :percent="100"
                        :stroke-color="waitColor.percent"
                        :size="48"
                        :trail-width="4"
                        :stroke-width="4"
                      >
                        <Icon
                          v-if="projectData.status === 7"
                          type="md-stopwatch"
                          :size="24"
                          :style="waitColor.icon + 'font-weight:600;'"
                        ></Icon>
                        <Icon
                          v-else
                          type="ios-checkmark"
                          :size="36"
                          :style="waitColor.icon + ';font-weight:600;'"
                        ></Icon>
                      </i-circle>
                      <div>
                        <p>{{ waitTitle.title }}</p>
                        <p>{{ waitTitle.subtitle }}</p>
                      </div>
                    </div>
                  </div>
                  <!-- 提交之后等待审核 -->
                  <!-- 发送按钮 -->
                  <Row
                    v-if="projectData.status === 2"
                    type="flex"
                    justify="end"
                  >
                    <i-col span="11">
                      <div @click="sendProject" class="send-project ivu-card">
                        <h5>发送</h5>
                        <span>项目公开后，您编辑项目的权限将受到限制。</span>
                      </div>
                    </i-col>
                  </Row>
                  <!-- 发送按钮 -->
                </div>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getProjectByFlagById,
  waitCheckProject,
  backToEdit,
  sendProject
} from "../services/api";
import { rewardListByProjectId } from "../services/api/project";

const _ = require("lodash");

export default {
  name: "EditProject",
  data: () => ({
    projectData: {
      category: {},
      owner: {}
    },
    listData: [
      {
        title: "基本信息",
        subtitle:
          "为你创意选一个标题，然后添加封面或者是影片，还有您创意的宣传信息。"
      },
      {
        title: "奖励阶梯",
        subtitle: "设置回报给众筹者的奖励以及其他杂项等。"
      },
      {
        title: "创意的故事",
        subtitle:
          "对这个创意有什么特别的故事或者事情可以分享给大家的，这可以让众筹更加的顺利。"
      },
      {
        title: "项目检验中",
        subtitle: "管理员会根据您的信息和项目的合理程度进行处理，请耐心等候"
      }
    ],
    reward: false
  }),
  methods: {
    getProjectData() {
      getProjectByFlagById({
        projectId: this.$route.params.projectId,
        flag: 0
      }).then(res => {
        this.projectData = res.data;
        if (
          res.data.status === 1 &&
          res.data.status === 5 &&
          res.data.status === 6
        ) {
          this.$router.replace("/projectDetail/" + res.data.id);
        }
      });

      rewardListByProjectId(this.$route.params.projectId).then(res => {
        if (res.data.length) {
          this.reward = true;
        } else {
          this.reward = false;
        }
      });
    },
    toEditDatail(params) {
      if (this.projectData.status === 0) {
        this.$router.push("/editDetail/" + this.projectData.id + "/" + params);
      } else {
        this.$Message.info("您目前不可以对此操作");
      }
    },
    submitToCheck() {
      this.$Modal.confirm({
        title: "您确定要提交该项目？",
        content:
          "<p>不要担心，如若事后还想编辑，在未发布之前，还可以回到编辑状态</p>",
        onOk: () => {
          this.$Spin.show();
          setTimeout(() => {
            waitCheckProject({
              projectId: this.projectData.id
            }).then(res => {
              this.$Spin.hide();
              this.projectData = res.data;
              this.$Message.success("提交成功");
            });
          }, 500);
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    back2Edit() {
      this.$Modal.confirm({
        title: "您确定要回到编辑状态？",
        content: "<p>这意味着您将会重新提交该项目，而且我们也会重新审核</p>",
        onOk: () => {
          this.$Spin.show();
          setTimeout(() => {
            backToEdit({
              projectId: this.projectData.id
            }).then(res => {
              this.projectData = res.data;
              this.$Spin.hide();
              this.$Message.info("您现在可以再次编辑了");
            });
          }, 500);
        },
        onCancel: () => {
          // this.$Message.info("。。。");
        }
      });
    },
    sendProject() {
      this.$Modal.confirm({
        title: "您确定要发布该项目？",
        onOk: () => {
          this.$Spin.show();
          setTimeout(() => {
            sendProject({
              projectId: this.projectData.id
            }).then(res => {
              if (res.data) {
                this.$router.replace("/projectDetail/" + res.data.id);
                this.$Message.success("发布成功");
              } else {
                this.$Message.info("未知错误，请稍候再试");
              }
              this.$Spin.hide();
            });
          }, 1000);
        },
        onCancel: () => {}
      });
    }
  },
  computed: {
    basicColor() {
      let data = {};
      data.color = "#2db7f5";
      data.iconColor = "color:#e8eaec;";
      if (this.basicPercent == 100) {
        data.color = "#1c9482";
        data.iconColor = "color:#1c9482;";
      }
      return data;
    },
    rewardColor() {
      let data = {};
      data.color = "#2db7f5";
      data.iconColor = "color:#e8eaec;";
      if (this.rewardPercent == 100) {
        data.color = "#1c9482";
        data.iconColor = "color:#1c9482;";
      }
      return data;
    },
    storyColor() {
      let data = {};
      data.color = "#2db7f5";
      data.iconColor = "color:#e8eaec;";
      if (this.storyPercent == 100) {
        data.color = "#1c9482";
        data.iconColor = "color:#1c9482;";
      }
      return data;
    },
    allDone() {
      if (
        this.basicPercent === 100 &&
        this.rewardPercent === 100 &&
        this.storyPercent === 100
      ) {
        return true;
      } else {
        return false;
      }
    },
    waitColor() {
      let data = {};
      data.icon = "color:#eaeef2;";
      data.percent = "#eaeef2";
      if (this.projectData.status === 2) {
        data.icon = "color:#1c9482;";
        data.percent = "#1c9482";
        return data;
      }
      return data;
    },
    waitTitle() {
      let data = {
        title: "项目检验中",
        subtitle: "管理员会根据您的信息和项目的合理程度进行处理，请耐心等候"
      };
      if (this.projectData.status === 2) {
        data = {
          title: "通过审核",
          subtitle: "快去准备发布吧！点击发送按钮，大家就可以看到你的项目了"
        };
        return data;
      }
      return data;
    },
    basicPercent() {
      if (!this.projectData.id) {
        return 0;
      } else {
        let {
          title,
          subtitle,
          pic,
          video,
          targetpoint,
          targetdate,
          perdate,
          category
        } = this.projectData;
        let basicInfo = {
          title,
          subtitle,
          pic,
          video,
          targetpoint,
          targetdate,
          perdate,
          category
        };
        // eslint-disable-next-line no-unused-vars
        let count = 0;
        for (const key in basicInfo) {
          const element = basicInfo[key];
          if (element !== "" && element !== null) {
            count++;
          }
        }
        return (count / _.size(basicInfo)) * 100;
      }
    },
    rewardPercent() {
      if (this.reward) {
        return 100;
      } else return 0;
    },
    storyPercent() {
      if (!this.projectData.id) {
        return 0;
      } else {
        if (this.projectData.story === null || this.projectData.story === "")
          return 0;
        else return 100;
      }
    }
  },
  created() {
    this.getProjectData();
  },
  mounted() {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    projectData(to) {},
    $route() {
      this.getProjectData();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/editProject.scss";
</style>
