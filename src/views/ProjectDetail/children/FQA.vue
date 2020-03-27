<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-20 11:08:30
 * @LastEditTime: 2020-03-27 17:58:57
 * @FilePath: \indidea-frontend\src\views\ProjectDetail\children\FQA.vue
 * @Description: 
 -->
<template>
  <div class="fqa-main">
    <Row class="fqa-main-header">
      <i-col span="16">
        <h3>常见问题</h3>
      </i-col>
    </Row>
    <template v-if="show">
      <Row v-if="!fqaList.length" class="fqa-main-none">
        <div>
          <p>这里还没有问答记录，你可以向发起人提问</p>
          <div @click="doQuestion" class="do-question-btn">提问</div>
        </div>
      </Row>
      <Row v-else class="fqa-main-content">
        <i-col span="16">
          <ul>
            <li v-for="(item, index) in fqaList" :key="index">
              <div class="fqa-question" @click="showA(index)">
                <div>
                  <span class="question">
                    {{ item.quzcontent }}
                  </span>
                  <span class="question-icon">
                    <Icon
                      v-if="showNum.indexOf(index) === -1"
                      type="ios-arrow-forward"
                    />
                    <Icon v-else type="ios-arrow-down" />
                  </span>
                </div>
              </div>
              <div v-if="showNum.indexOf(index) !== -1" class="fqa-answer">
                <div class="fqa-answer-content">
                  <p>
                    {{ item.ancontent }}
                  </p>
                </div>
                <div class="fqa-answer-date">
                  {{ date(item.updatedat) }}
                </div>
              </div>
            </li>
          </ul>
        </i-col>
        <i-col offset="1" span="6">
          <div class="doQuestion">
            <p>
              没有你想要的问题？你也可以发起提问。
            </p>
            <div @click="doQuestion" class="do-question-btn">提问</div>
          </div>
        </i-col>
      </Row>
      <Modal
        :mask-closable="false"
        v-model="modal"
        @on-ok="ok"
        title="输入你的问题"
      >
        <i-input
          type="textarea"
          maxlength="150"
          show-word-limit
          v-model="quz"
        ></i-input>
      </Modal>
    </template>
    <div class="fake" v-else>
      <img src="../../../assets/loading2.gif" alt=".." />
    </div>
  </div>
</template>
<script>
import { quzList, addQuz } from "../../../services/api/project";
export default {
  name: "FQA",
  data: () => ({
    fqaList: [],
    showNum: [],
    projectId: 0,
    modal: false,
    quz: "",
    show: false
  }),
  methods: {
    async getQuzList() {
      await quzList(this.projectId).then(res => {
        if (res.data) this.fqaList = res.data;
        return true;
      });
    },
    initPage() {
      this.projectId = this.$route.params.projectId;
      this.getQuzList().then(() => {
        setTimeout(() => {
          this.show = true;
        }, 1000);
      });
    },
    showA(i) {
      let index = this.showNum.indexOf(i);
      if (index !== -1) {
        this.showNum.splice(index, 1);
      } else {
        this.showNum.push(i);
      }
    },
    doQuestion() {
      this.modal = true;
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleString();
    },
    ok() {
      if (this.quz === "" || this.quz === null) {
        this.$Message.error("请输入问题");
      } else {
        addQuz(this.projectId, this.quz).then(res => {
          if (res.data) this.$Message.success("成功提问，请等待发起者回复");
          else this.$Message.info("未知错误");
          this.quz = "";
        });
      }
    }
  },
  created() {
    this.initPage();
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
@mixin base-container {
  max-width: 1140px;
  padding-right: 60px;
  padding-left: 60px;
  margin-right: auto;
  margin-left: auto;
}
.fake {
  height: 160px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 30px;
  }
}
.fqa-main {
  @include base-container();
  padding-bottom: 155px;
  &-header {
    .ivu-col {
      padding: 0 18px;
      margin-bottom: 30px;
      h3 {
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
      }
    }
  }
  &-none {
    & > div {
      p {
        margin-bottom: 36px;
        font-size: 16px;
        line-height: 24px;
      }
      .do-question-btn {
        padding: 12px 42px;
        border: 1px solid #dedede;
        box-sizing: inherit;
        display: inline-block;
        background-color: #282828;
        color: white;
        letter-spacing: 2px;
        font-size: 16px;
        font-weight: 500;
        transition: all 200ms;
        cursor: pointer;
        &:hover {
          transform: translateY(2px);
          outline: 1px solid #13adaa;
        }
      }
    }
  }
  &-content {
    ul,
    li {
      list-style: none;
    }
    li {
      margin-bottom: 12px;
      border: 0.1px solid #dcdedd;
      transition: all 100ms;
      &:hover {
        background-color: #f3f2f2;
      }
    }
    .fqa-question {
      display: flex;
      padding: 18px;
      align-items: center;
      -webkit-box-align: center;
      div {
        width: 100%;
        float: none;
        display: flex;
        align-items: center;
        -webkit-box-align: center;
        cursor: pointer;
      }
      .question {
        font-weight: 500;
        color: #282828;
        font-size: 14px;
        line-height: 24px;
      }
      .question-icon {
        margin-left: auto;
        padding-left: 18px;
      }
    }
    .fqa-answer {
      transition: all 200ms;
      padding-left: 18px;
      padding-right: 54px;
      &-content {
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #282828;
        p {
          font-size: 16px;
          margin-bottom: 20px;
        }
      }
      &-date {
        margin-bottom: 18px;
        color: #656969;
        font-size: 12px;
        line-height: 18px;
      }
    }
    .ivu-col:last-child {
      padding-left: 24px;
      .doQuestion {
        padding-left: 24px;
        border-left: 3px solid #dcdedd;
        p {
          margin-bottom: 18px;
        }
        .do-question-btn {
          padding: 8px 24px;
          border: 1px solid #dedede;
          box-sizing: inherit;
          display: inline-block;
          background-color: #282828;
          color: white;
          letter-spacing: 2px;
          font-size: 14px;
          font-weight: 500;
          transition: all 200ms;
          cursor: pointer;
          &:hover {
            transform: translateY(2px);
            outline: 1px solid #13adaa;
          }
        }
      }
    }
  }
}
</style>
