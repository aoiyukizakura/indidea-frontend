<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-20 11:07:43
 * @LastEditTime: 2020-03-21 20:31:09
 * @FilePath: \indidea-frontend\src\views\ProjectDetail\children\Story.vue
 * @Description: 
 -->
<template>
  <div class="main">
    <Row class="main-row">
      <i-col span="16">
        <Row class="main-left-row">
          <!-- <i-col span="4"></i-col> -->
          <i-col span="20" offset="3">
            <div class="story-container">
              <div class="story-content">
                <div class="title">
                  <h3>背景故事</h3>
                </div>
                <div class="content">
                  <div id="viewer">
                    <strong>
                      正在加载中...
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </Row>
      </i-col>
      <i-col span="8" style="max-width: 372px">
        <div>
          <div class="owner-card">
            <div class="hide-card">
              <img
                src="../../../assets/default.png"
                alt=""
                v-real-img="projectData.owner.avatar"
              />
            </div>
            <div class="owner-card-info">
              <div class="username">
                {{ projectData.owner ? projectData.owner.username : "-" }}
              </div>
              <div class="des">
                {{
                  projectData.owner
                    ? projectData.owner.des
                      ? projectData.owner.des
                      : "这个人太懒了，还没有写描述"
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="reward">
            <h3>必须支持一下</h3>
            <ol>
              <li>
                <div class="reward-free" ref="rewardFree">
                  <div>
                    <h2>我就是活雷锋，不需要回报</h2>
                  </div>
                  <div class="reward-input">
                    <i-input type="number" v-model="point"></i-input>
                    <Button @click="doReward(point, 0)" long>继续</Button>
                  </div>
                </div>
              </li>
              <li v-for="(item, index) in projectReward" :key="index">
                <RewardCard @goPay="doReward" :data="item"></RewardCard>
              </li>
            </ol>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
import {
  rewardListByProjectId,
  getProjectWithoutHit,
  // eslint-disable-next-line no-unused-vars
  supportProject
} from "../../../services/api/project";
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content
import RewardCard from "../../../components/RewardCard/RewardCard";
// eslint-disable-next-line no-unused-vars
import { USER_DATA } from "../../../utils/Constants";
import {} from "../../../services/api";
import { USER_LOGIN } from "../../../utils/FunctionUtils";

const Viewer = require("tui-editor/dist/tui-editor-Viewer");
const _ = require("lodash");
export default {
  name: "Story",
  components: {
    RewardCard
  },
  data: () => ({
    projectId: null,
    projectReward: [],
    projectData: { owner: {} },
    viewer: null,
    point: 1
  }),
  methods: {
    initPage() {
      this.projectId = this.$route.params.projectId;
      getProjectWithoutHit(this.projectId).then(res => {
        if (res.data) {
          this.projectData = res.data;
          this.viewer = new Viewer({
            el: document.querySelector("#viewer"),
            height: "auto",
            initialValue: res.data.story
          });
        }
      });
      rewardListByProjectId(this.projectId)
        .then(({ data }) => {
          if (data.length) {
            this.projectReward = _.orderBy(data, ["point"], ["asc"]);
          }
        })
        .catch(e => {
          console.log("e :", e);
        });
    },
    // eslint-disable-next-line no-unused-vars
    doReward(point, rewardId) {
      if (USER_LOGIN()) {
        this.$Modal.confirm({
          title: "支付操作",
          content: "请再次确认您的操作！",
          onOk: () => {
            supportProject(this.projectId, point, rewardId).then(res => {
              if (res.data) {
                scrollTo(0, 0);
                setTimeout(() => {
                  this.$emit("refresh", this.$route);
                  this.$Message.success("感谢您的支持！");
                }, 500);
              } else {
                this.$Message.error({
                  content: "余额不足或是您选择的方案有误",
                  closable: true,
                  duration: 5
                });
              }
            });
          },
          onCancel: () => {
            this.$Message.info("我们期待您的支持");
          }
        });
      } else {
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    this.initPage();
  },
  watch: {
    $route() {
      this.initPage();
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  background-color: white;
  // padding-bottom: 400px;
  &-row {
    & > .ivu-col {
      padding: 0 18px;
    }
  }
  .main-left-row {
    & > .ivu-col:last-child {
      padding: 0 18px;
    }
  }
  .story-container {
    .story-content {
      .title {
        margin-bottom: 30px;
        h3 {
          font-size: 21px;
          font-weight: 400;
          line-height: 30px;
        }
      }
    }
  }
}

.owner-card {
  transition: all 300ms;
  cursor: pointer;
  .hide-card {
    height: 36px;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    position: relative;
    img {
      height: 72px;
      width: 72px;
      object-fit: cover;
      border-radius: 50%;
      position: absolute;
      top: 0;
      z-index: 99;
    }
  }
  &-info {
    width: 100%;
    position: relative;
    padding: 54px 18px 18px;
    margin-bottom: 36px;
    font-size: 14px;
    border: 1px solid #e8e8e8;
    .username {
      text-overflow: ellipsis;
      text-align: left;
      overflow: hidden;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 18px;
    }
    .des {
      text-align: left;
      font-size: 14px;
      line-height: 24px;
    }
  }
  &:hover {
    transform: translateY(2px);
  }
  &:hover &-info {
    border-color: #525252;
  }
}

.reward {
  h3 {
    font-size: 21px;
    margin-bottom: 42px;
    font-weight: 400;
    line-height: 30px;
  }
  ol {
    list-style: none;
    li {
      margin-bottom: 20px;
      border: 1px solid #dcdede;
      cursor: pointer;
      position: relative;
      background-color: white;
    }
  }
  .reward-free {
    background-color: white;
    & > div:first-of-type {
      margin: 0 20px;
      padding: 20px 0;
      h2 {
        color: #282828;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.4;
      }
    }
    .reward-input {
      padding: 0 18px;
      margin-bottom: 18px;
      /deep/.ivu-input {
        border-radius: 0 !important;
        margin-bottom: 18px;
      }
      /deep/.ivu-btn {
        border-radius: 0;
        height: 48px;
        color: white;
        background-color: #1c9482;
        font-weight: 700;
        font-size: 14px;
        transition: all 300ms;
      }
    }
  }
}

#viewer {
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  /deep/ * {
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
  }
  /deep/p {
    font-size: 16px;
  }
  /deep/h1 {
    border-bottom: none !important;
  }
}
</style>
