<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-20 11:09:52
 * @LastEditTime: 2020-03-30 14:04:25
 * @FilePath: \indidea-frontend\src\views\ProjectDetail\children\Msgboard.vue
 * @Description: 
 -->
<template>
  <div class="msgboard-container">
    <Row>
      <i-col span="16">
        <div class="comment-content">
          <div class="msg-input-area">
            <textarea
              @click="focus = true"
              :rows="rows"
              v-model="msg"
              placeholder="在这里可以输入您的信息"
            ></textarea>
            <div
              :class="
                'send-area ' + (focus ? 'max-height-auto' : 'max-height-0')
              "
            >
              <div @click="leaveMsg">留言</div>
              <div @click="focus = false">取消</div>
            </div>
          </div>
          <h3>
            留言列表 <span> {{ msgList.length }} </span>
          </h3>
          <p>目前只有支持者可以留言</p>
          <template v-if="show">
            <div v-if="msgList.length === 0" class="msg-none">
              <Icon size="15" type="md-text" />
              <span>当前没有留言</span>
            </div>
            <div v-else class="msg-list">
              <ul>
                <li v-for="(item, index) in msgList" :key="index">
                  <div class="msg-list-content">
                    <div class="msg-list-content-header">
                      <div>
                        <img
                          src="../../../assets/default.png"
                          v-real-img="item.user.avatar"
                          alt=".."
                        />
                        <div class="info">
                          <span> {{ item.user.username }} </span>
                          <time> {{ date(item.updatedat) }} </time>
                        </div>
                      </div>
                    </div>
                    <div class="msg-list-content-main">
                      <p>{{ item.content }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
          <div v-else class="fake">
            <img src="../../../assets/loading2.gif" alt="loading..." />
          </div>
        </div>
      </i-col>
      <i-col span="8">
        <div class="suggestion">
          <p>
            你可以在这里给项目发起人留言，这些留言可以是一个意见或者是一些具有建设性意义的信息。
          </p>
          <p>你是想要提一些问题吗？</p>
          <p @click="$router.push('./FQA')">查看该方案的提问环节。</p>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { msgList, addMsg } from "../../../services/api/project";
import { TOKEN } from "../../../utils/Constants";
export default {
  name: "Msgboard",
  data() {
    return {
      msg: "",
      rows: 3,
      focus: false,
      projectId: 0,
      msgList: [],
      show: false
    };
  },
  methods: {
    async getMsgList() {
      await msgList(this.projectId).then(res => {
        this.msgList = res.data;
        return true;
      });
    },
    async addMsg() {
      let token = localStorage.getItem(TOKEN);
      if (token) {
        await addMsg(this.projectId, this.msg).then(res => {
          if (res.data) {
            this.getMsgList();
            this.$Message.success("感谢您的留言！");
            this.msg = "";
            return true;
          } else {
            this.$Message.info("您可能还不是该项目的赞助人！");
            return false;
          }
        });
      } else {
        this.$router.push("/login");
      }
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleString().replace(/\//g, "-");
    },
    leaveMsg() {
      if (this.msg !== "" && this.msg !== null) {
        this.addMsg();
      } else {
        this.$Message.info("请填写信息！");
      }
    },
    init() {
      this.projectId = parseInt(this.$route.params.projectId);
      this.getMsgList().then(() => {
        setTimeout(() => {
          this.show = true;
        }, 800);
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.msgboard-container {
  max-width: 1040px;
  padding-right: 18px;
  padding-left: 18px;
  margin-right: auto;
  margin-left: auto;
  & > .ivu-row {
    margin: 0 -18px;
    .ivu-col {
      padding: 0 18px;
    }
  }
}
.fake {
  height: 120px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 30px;
  }
}
.comment-content {
  margin-top: 6px;
  p {
    text-align: center;
    padding: 12px;
    color: #282828;
    background-color: #f7f7f7;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  h3 {
    border-left: 4px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 16px;
    padding-left: 12px;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    position: relative;
    display: flex;
    span {
      margin-left: 6px;
      line-height: 14px;
      font-size: 12px;
    }
  }
  .msg-input-area {
    margin-bottom: 36px;
    textarea {
      width: 100%;
      resize: none;
      padding: 12px 16px;
      font-size: 13px;
      line-height: 24px;
      border-color: #dadada;
      background-color: #fafafa;
      outline: none;
      transition: all 200ms;
    }
    .send-area {
      margin-top: 16px;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      overflow: hidden;
      transition: all 200ms;
      div {
        padding: 6px 24px;
        border: 1px solid #656969;
        cursor: pointer;
        &:first-of-type {
          background-color: #598558;
          color: white;
        }
        &:last-of-type {
          background-color: #fafafa;
          color: #696969;
          margin-right: 12px;
        }
      }
    }
  }
  .msg-none {
    padding: 48px 30px;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
    color: #9b9e9e;
    span {
      margin-left: 12px;
      color: #9b9e9e;
    }
  }
  .msg-list {
    ul,
    li {
      list-style: none;
    }
    ul {
      padding: 12px;
      margin-bottom: 18px;
      background-color: #fafafa;
      border: 1px solid #e9e9e9;
    }
    li {
      margin-bottom: 18px;
    }
    &-content {
      cursor: pointer;
      word-break: break-word;
      position: relative;
      padding: 18px 18px 12px;
      background-color: white;
      border: 1px solid #d8d8d8;
      &-header {
        margin-bottom: 18px;
        display: flex;
        justify-content: space-between;
        & > div {
          display: flex;
          img {
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
            height: 36px;
            width: 36px;
            margin-right: 12px;
            display: inline-block;
            border-radius: 100%;
            object-fit: cover;
          }
          .info {
            span {
              margin-right: 12px;
              font-size: 14px;
              line-height: 18px;
            }
            time {
              display: block;
              color: #9b9e9e;
              font-size: 12px;
              line-height: 18px;
            }
          }
        }
      }
      &-main {
        width: 100%;
        p {
          font-size: 14px;
          line-height: 24px;
          color: #282828;
          background-color: white;
          text-align: left;
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
.suggestion {
  padding: 12px 0 12px 18px;
  border-left: 4px solid #dcdcdc;
  p {
    font-size: 14px;
    line-height: 24px;

    &:first-of-type {
      margin-bottom: 20px;
    }
    &:last-of-type {
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
.max-height-auto {
  height: 35px;
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}
.max-height-0 {
  height: 0;
  margin-top: 0px !important;
}
</style>
