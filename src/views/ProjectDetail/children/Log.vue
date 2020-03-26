<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-20 11:08:58
 * @LastEditTime: 2020-03-26 20:07:57
 * @FilePath: \indidea-frontend\src\views\ProjectDetail\children\Log.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="list-row">
      <Row v-for="(item, index) in logList" :key="index">
        <i-col class="list-col" span="16" offset="4">
          <div class="list-icon">
            <Icon size="18" type="md-list" />
          </div>
          <div class="list-content" @click="logDetail(item)">
            <article>
              <header>
                <div>更新 #{{ item.number }}</div>
                <h2>{{ item.title }}</h2>
                <div>
                  <img
                    src="../../../assets/default.png"
                    v-real-img="item.project.owner.avatar"
                  />
                  <div>
                    <div>{{ item.project.owner.username }}</div>
                    <span> {{ date(item.updatedat) }} </span>
                  </div>
                </div>
              </header>
              <div class="log-body">
                <div class="log-content" v-html="item.content"></div>
                <!-- <object :data="item.content" type="text/html"></object> -->
                <div class="gradient-hover"></div>
              </div>
              <footer>
                <span class="load-more">显示更多</span>
              </footer>
            </article>
          </div>
        </i-col>
        <Modal
          class="modal-modal"
          v-model="modal"
          fullscreen
          footer-hide
          title="更新日志"
        >
          <div class="modal-content">
            <div class="modal-title">
              <header>
                <div>更新 #{{ item.number }}</div>
                <h2>{{ item.title }}</h2>
                <div>
                  <img
                    src="../../../assets/default.png"
                    v-real-img="item.project.owner.avatar"
                  />
                  <div>
                    <div>{{ item.project.owner.username }}</div>
                    <span> {{ date(item.updatedat) }} </span>
                  </div>
                </div>
              </header>
            </div>
            <div class="log-content" v-html="content"></div>
          </div>
        </Modal>
      </Row>
      <Row>
        <i-col class="list-col" span="16" offset="4">
          <div class="project-publish-card">
            <h2>项目正式创建</h2>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import { logList } from "../../../services/api/project";
export default {
  name: "Log",
  data: () => ({
    projectId: 0,
    logList: [],
    viewer: "",
    modal: false,
    content: ""
  }),
  methods: {
    getLog() {
      logList(this.projectId).then(res => {
        this.logList = res.data;
      });
    },
    init() {
      this.projectId = parseInt(this.$route.params.projectId);
      this.getLog();
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleDateString().replace(/\//g, "-");
    },
    logDetail(item) {
      this.content = item.content;
      this.modal = true;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@mixin base-container {
  max-width: 1336px;
  padding-right: 60px;
  padding-left: 60px;
  margin-right: auto;
  margin-left: auto;
}
.list-row {
  @include base-container();
  margin-bottom: 36px;
  .ivu-row {
    margin-bottom: 36px;
  }
  .list-col {
    padding: 0 18px;
    position: relative;
    .list-icon {
      position: absolute;
      top: 60px;
      left: 1px;
      height: 35px;
      width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgb(211, 141, 11);
      color: white;
    }
  }
}
.list-content {
  padding: 36px;
  border: 1px solid #dcdedd;
  cursor: pointer;
  transition: all 200ms;
  header {
    & > div:first-of-type {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      color: rgba(40, 40, 40, 0.5);
      font-size: 13px;
      line-height: 18px;
    }
    & > h2 {
      margin-bottom: 18px;
      font-size: 32px;
      line-height: 40px;
      font-weight: bold;
      color: #282828;
    }
    & > div:last-of-type {
      padding-bottom: 18px;
      margin-bottom: 18px;
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid #dcdedd;
      font-size: 14px;
      line-height: 24px;
      img {
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
        height: 42px;
        width: 42px;
        display: inline-block;
        border: 1px solid #dcdedd;
        border-radius: 100%;
        vertical-align: middle;
        flex-shrink: 0;
        object-fit: cover;
      }
      & > div {
        padding-left: 12px;
        span {
          color: rgba(40, 40, 40, 0.5);
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
  footer {
    text-align: center;
    margin-top: 6px;
  }
  .log-body {
    max-height: 240px;
    transition: all 200ms;
    position: relative;
    overflow: hidden;
  }
  .gradient-hover {
    position: absolute;
    height: 120px;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgb(255, 255, 255) 80%
    );
  }
  &:hover {
    border-color: #969696;
    .load-more {
      text-decoration: underline;
    }
    .log-body {
      max-height: 360px;
    }
  }
}

.log-content {
  overflow: hidden;
  /deep/h1,
  /deep/h2,
  /deep/h3,
  /deep/h4,
  /deep/h5,
  /deep/h6 {
    margin-bottom: 24px !important;
  }
  /deep/p {
    margin-bottom: 32px !important;
    line-height: 1.8 !important;
    letter-spacing: 0.5px !important;
    line-height: 24px !important;
    text-emphasis: 2em !important;
  }
  /deep/img {
    width: 100%;
    margin: 6px 0;
  }
  /deep/span {
    color: #656969;
    font-size: 12px;
  }
}
.modal-title {
  header {
    & > div:first-of-type {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      color: rgba(40, 40, 40, 0.5);
      font-size: 13px;
      line-height: 18px;
    }
    & > h2 {
      margin-bottom: 18px;
      font-size: 32px;
      line-height: 40px;
      font-weight: bold;
      color: #282828;
    }
    & > div:last-of-type {
      padding-bottom: 18px;
      margin-bottom: 18px;
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid #dcdedd;
      font-size: 14px;
      line-height: 24px;
      img {
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
        height: 42px;
        width: 42px;
        display: inline-block;
        border: 1px solid #dcdedd;
        border-radius: 100%;
        vertical-align: middle;
        flex-shrink: 0;
        object-fit: cover;
      }
      & > div {
        padding-left: 12px;
        span {
          color: rgba(40, 40, 40, 0.5);
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
}
.modal-content {
  max-width: 736px;
  padding-right: 60px;
  padding-left: 60px;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
}
.modal-modal /deep/.ivu-modal-body {
  background-color: #fafafa;
  .modal-content {
    padding-top: 18px;
    box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.17);
  }
}
.project-publish-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280px;
  width: 100%;
  border: 1px solid #dcdedd;
  color: white;
  position: relative;
  overflow: hidden;
  background-color: #20c9af;
}
</style>
