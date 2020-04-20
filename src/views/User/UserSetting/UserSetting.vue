<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-27 22:00:20
 * @LastEditTime: 2020-04-21 01:41:14
 * @FilePath: \indidea-frontend\src\views\User\UserSetting\UserSetting.vue
 * @Description: 
 -->
<template>
  <div>
    <div>
      <div>
        <ul v-if="projectList.length">
          <Tabs value="name1">
            <TabPane label="草稿项目" name="name1">
              <template v-if="editList.length">
                <li v-for="(item, index) in editList" :key="index">
                  <div class="content">
                    <div class="header-img">
                      <img
                        src="../../../assets/default.png"
                        v-real-img="item.pic"
                        alt="..."
                      />
                    </div>
                    <div class="category">
                      <div>
                        <div>
                          <span class="title">
                            {{ item.category.name }}
                            创意项目
                          </span>
                          <Icon
                            v-if="[1, 5, 6].indexOf(item.status) === -1"
                            style="margin-left: 12px"
                            type="md-create"
                          />
                        </div>
                        <div class="date">
                          创建于 {{ date(item.createdat) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="operating0">
                    <span @click="edit(item.id)">继续编辑</span>
                    <span @click="delete0(item.id)">删除项目</span>
                  </div>
                </li>
              </template>
              <template v-else>
                <div class="none-content">暂无数据</div>
              </template>
            </TabPane>
            <TabPane label="进行中项目" name="name2">
              <template v-if="yetList.length">
                <li v-for="(item, index) in yetList" :key="index">
                  <div
                    @click="$router.push(`/project-detail/${item.id}`)"
                    class="content"
                  >
                    <div class="header-img">
                      <img
                        src="../../../assets/default.png"
                        v-real-img="item.pic"
                        alt="..."
                      />
                    </div>
                    <div class="category">
                      <div>
                        <div>
                          <span class="title">
                            {{ item.category.name }}
                            创意项目
                          </span>
                          <Icon
                            v-if="[1, 5, 6].indexOf(item.status) === -1"
                            style="margin-left: 12px"
                            type="md-create"
                          />
                        </div>
                        <div class="date">
                          创建于 {{ date(item.createdat) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="operating">
                    <span @click="updateLog(item.id)">更新日志</span>
                    <span @click="answer(item.id)">待答列表</span>
                  </div>
                </li>
              </template>
              <template v-else>
                <div class="none-content">暂无数据</div>
              </template>
            </TabPane>
            <TabPane label="已结束项目" name="name3">
              <template v-if="doneList.length">
                <li v-for="(item, index) in doneList" :key="index">
                  <div
                    @click="$router.push(`/project-detail/${item.id}`)"
                    class="content"
                  >
                    <div class="header-img">
                      <img
                        src="../../../assets/default.png"
                        v-real-img="item.pic"
                        alt="..."
                      />
                    </div>
                    <div class="category">
                      <div>
                        <div>
                          <span class="title">
                            {{ item.category.name }}
                            创意项目
                            {{
                              item.getpoint >= item.targetpoint
                                ? "（成功）"
                                : "（失败）"
                            }}
                          </span>
                          <Icon
                            v-if="[1, 5, 6].indexOf(item.status) === -1"
                            style="margin-left: 12px"
                            type="md-create"
                          />
                        </div>
                        <div class="date">
                          创建于 {{ date(item.createdat) }}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div class="operating">
                    <span @click="updateLog(item.id)">更新日志</span>
                    <span class="support-table" @click="sponsor(item.id)">
                      支持者表
                    </span>
                    <span
                      v-if="item.getpoint >= item.targetpoint"
                      @click="
                        addInfo(item.id, item.publishlink, item.publishtitle)
                      "
                    >
                      发布链接
                    </span>
                  </div>
                </li>
              </template>
              <template v-else>
                <div class="none-content">暂无数据</div>
              </template>
            </TabPane>
          </Tabs>
        </ul>
        <div class="none-content" v-else>
          暂无内容，赶快去发起吧。
        </div>
      </div>
    </div>
    <Modal footer-hide v-model="update_modal" fullscreen :title="title">
      <div v-if="show" class="log-info">
        <div class="log-title">
          <input type="text" v-model="log_title" placeholder="更新标题" />
        </div>
        <div v-if="show" id="editSection"></div>
        <input
          type="file"
          @change="upload($event, 0)"
          ref="storyImg"
          accept="image/*"
          hidden
        />
        <Button @click="saveLog" type="success">保存</Button>
      </div>
      <div v-else class="an-info">
        <ul>
          <li v-for="(item, index) in quzList" :key="index">
            <div class="an-info-content">
              <div class="quz-content" @click="answerQuz(index)">
                {{ item.quzcontent }}
              </div>
              <div class="an-content" v-if="quzNum === index">
                <textarea
                  placeholder="在此输入你的回答"
                  rows="3"
                  type="text"
                  v-model="answerContent"
                />
                <div @click="doAnswer(item.id)">
                  <span>回答</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
    <Modal
      footer-hide
      width="60"
      v-model="sponsor_list_show"
      title="赞助者列表"
    >
      <Table
        v-if="sponsor_list.length"
        :columns="columns"
        :data="sponsor_list_filter"
      ></Table>
    </Modal>
    <Modal v-model="add_info_show" title="添加信息" @on-ok="comfirm_add">
      <Input v-model="publishlink" placeholder="该项目的主页。" />
      <Input
        v-model="publishtitle"
        placeholder="该项目的发布标题（简短）"
        style="margin-top: 24px"
      />
    </Modal>
  </div>
</template>
<script>
import $ from "jquery";
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import {
  getMyProjects,
  updateLog,
  waitReply,
  replyQuz
} from "../../../services/api/user";
import { uploadFile, updateProject0 } from "../../../services/api";
import { deleteProject, sponsorList } from "../../../services/api/project";
const Editer = require("tui-editor");
export default {
  name: "UserSetting",
  data() {
    return {
      projectList: [],
      update_modal: false,
      editor: "",
      log_title: "",
      update_id: 0,
      show: false,
      quzList: [],
      answerContent: "",
      quzNum: null,
      title: "",
      sponsor_list: [],
      sponsor_list_show: false,
      columns: [
        {
          title: "赞助者名",
          key: "sponsor.username",
          render: (h, params) => {
            return h("div", params.row.sponsor.username);
          }
        },
        {
          title: "邮箱",
          key: "sponsor.email",
          render: (h, params) => {
            return h("div", params.row.sponsor.email);
          }
        },
        {
          title: "地址",
          key: "sponsor.address",
          render: (h, params) => {
            return h("div", params.row.sponsor.address);
          }
        },
        {
          title: "赞助阶梯",
          key: "reward.name",
          render: (h, params) => {
            return h("div", params.row.reward ? params.row.reward.name : "");
          }
        },
        {
          title: "实际金额",
          key: "point"
        },
        {
          title: "时间",
          key: "createdat",
          render: (h, params) => {
            return h("div", this.datetime(params.row.createdat));
          }
        }
      ],
      add_info_show: false,
      publishlink: "",
      publishtitle: "",
      add_info_id: 0
    };
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      getMyProjects().then(res => {
        if (res.data) {
          this.projectList = res.data;
        }
      });
    },
    getWaitList() {
      waitReply(this.update_id).then(res => {
        if (res.data) {
          this.quzList = res.data;
        }
      });
    },
    updateLog(id) {
      this.show = true;
      this.title = "更新日志";
      this.$Spin.show();
      this.update_id = id;
      setTimeout(() => {
        this.$Spin.hide();
        this.initEditor();
        this.update_modal = true;
      }, 500);
    },
    answer(id) {
      this.show = false;
      this.title = "常见问题";
      this.$Spin.show();
      this.update_id = id;
      setTimeout(() => {
        this.$Spin.hide();
        this.getWaitList();
        this.update_modal = true;
      }, 500);
    },
    answerQuz(index) {
      this.answerContent = null;
      if (this.quzNum == index) {
        this.quzNum = null;
      } else {
        this.quzNum = index;
      }
    },
    doAnswer(id) {
      this.$Spin.show();
      if (this.answerContent !== null && this.answerContent !== "") {
        setTimeout(() => {
          replyQuz(id, this.answerContent).then(res => {
            if (res.data) {
              this.quzNum = null;
              this.answerContent = null;
              this.getWaitList();
              setTimeout(() => {
                this.$Spin.hide();
                this.$Message.success("回复成功");
              }, 200);
            } else {
              this.$Spin.hide();
            }
          });
        }, 200);
      } else {
        this.$Spin.hide();
        this.$Message.info("请填写回答");
      }
    },
    edit(id) {
      this.$router.push(`/editProject/${id}`);
    },
    initEditor() {
      this.editor = new Editer({
        el: document.querySelector("#editSection"),
        height: "auto",
        minHeight: "540px",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        usageStatistics: false,
        initialValue: this.storyData,
        hideModeSwitch: false,
        placeholder: "在这里你可以向你的支持者们更新你的进度...",
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          // 'image',
          "link",
          "divider",
          "code",
          "codeblock"
        ]
      });
      let toolbar = this.editor.getUI().getToolbar();
      let imgDom = this.$refs.storyImg;
      this.editor.eventManager.addEventType("uploadImg");
      this.editor.eventManager.listen("uploadImg", () => {
        imgDom.click();
      });
      toolbar.addButton({
        name: "uploadImg",
        className: "upload-img",
        event: "uploadImg",
        tooltip: "插入一张图片",
        $el: $(
          `<i class="custom-video-button ivu-icon ivu-icon-md-images"></i>`
        )
      });
    },
    upload(e, flag) {
      let target = e.target;
      let file = target.files[0];
      if (file) {
        let fileData = new FormData();
        fileData.append("file", file);
        if (flag === 0) {
          // 上传图片
          uploadFile(fileData).then(res => {
            let imgUrl = "http://localhost:8888/uploads/" + res.data;
            this.addImgToMd(imgUrl);
          });
        }
      }
    },
    //添加图片到markdown
    addImgToMd(data) {
      let editor = this.editor.getCodeMirror();
      let editorHtml = this.editor.getCurrentModeEditor();
      let isMarkdownMode = this.editor.isMarkdownMode();
      if (isMarkdownMode) {
        editor.replaceSelection(`![img](${data})`);
      } else {
        let range = editorHtml.getRange();
        let img = document.createElement("img");
        img.src = `${data}`;
        img.alt = "img";
        range.insertNode(img);
      }
    },
    destroyEditor() {
      if (!this.editor) return;
      this.editor.off("change");
      this.editor.remove();
      this.editor = "";
    },
    saveLog() {
      // eslint-disable-next-line no-unused-vars
      let content = this.editor.getHtml();
      this.update_modal = false;
      if (content && this.log_title) {
        updateLog(this.update_id, this.log_title, content).then(res => {
          if (res.data) {
            this.$Message.success("更新成功！");
            setTimeout(() => {
              this.$router.push(`/project-detail/${this.update_id}/Log`);
            }, 200);
          }
        });
      } else {
        this.$Message.info("请完成信息");
      }
    },
    date(d) {
      let date = new Date(d);
      return date.toLocaleDateString().replace(/\//g, "-");
    },
    datetime(d) {
      let date = new Date(d);
      return date.toLocaleString().replace(/\//g, "-");
    },
    delete0(id) {
      this.$Modal.confirm({
        title: "确认删除这个项目？该操作不可逆。",
        okText: "删除",
        onOk: () => {
          deleteProject(id).then(res => {
            if (res.data) {
              this.$Notice.success({
                title: "删除成功"
              });
              this.getList();
            } else {
              this.$Notice.success({
                title: "删除失败"
              });
            }
          });
        }
      });
    },
    sponsor(id) {
      sponsorList(id).then(res => {
        this.sponsor_list = res.data;
        this.sponsor_list_show = true;
      });
    },
    addInfo(id, link, title) {
      this.add_info_show = id > 0;
      this.add_info_id = id;
      this.publishlink = link;
      this.publishtitle = title;
    },
    comfirm_add() {
      updateProject0(this.add_info_id, {
        publishlink: this.publishlink,
        publishtitle: this.publishtitle
      }).then(res => {
        if (res.data) {
          this.$Notice.success({
            title: "更新成功"
          });
        }
      });
    }
  },
  computed: {
    doneList() {
      return this.projectList.filter(project => project.status === 6);
    },
    yetList() {
      return this.projectList.filter(
        project => [1, 5].indexOf(project.status) !== -1
      );
    },
    editList() {
      return this.projectList.filter(
        project => [0, 2, 3, 7].indexOf(project.status) !== -1
      );
    },
    sponsor_list_filter() {
      return this.sponsor_list.filter(sponsor => sponsor.reward);
    }
  },
  watch: {
    update_modal(to) {
      if (!to) {
        if (this.editor) this.destroyEditor();
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    // this.initEditor();
  },
  beforeDestroy() {
    this.update_modal = false;
  }
};
</script>
<style lang="css" scoped>
ul,
li {
  list-style: none;
}

li {
  position: relative;
}

.content {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 18px;
  border: 1px solid #decded;
  cursor: pointer;
  transition: all 300ms;
}
.content:hover {
  border-color: #c1afd1;
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.17);
}
.content .header-img img {
  height: 50px;
  font-size: 100%;
  vertical-align: middle;
}
.content .category {
  margin-left: 24px;
}
.content .category .title {
  line-height: 24px;
  font-size: 16px;
  color: #282828;
  border: 500;
}
.content .category .date {
  font-size: 12px;
  line-height: 24px;
  color: #656969;
}

.operating .support-table {
  margin-right: 12px;
}
.operating .support-table:hover {
  background-color: #ddd;
  transform: translateY(2px);
}
.operating {
  position: absolute;
  right: 20px;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
}
.operating span {
  border: 1px solid #edcdcd;
  padding: 5px 18px;
  cursor: pointer;
  transition: all 200ms;
}
.operating span:first-of-type {
  background-color: #468a51;
  color: white;
  margin-right: 12px;
}
.operating span:first-of-type:hover {
  background-color: #336d3c;
  transform: translateY(2px);
}
.operating span:last-of-type {
  background-color: #282828;
  color: white;
}
.operating span:last-of-type:hover {
  background-color: #000000;
  transform: translateY(2px);
}

.operating0 {
  position: absolute;
  right: 20px;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
}
.operating0 span:last-of-type {
  margin-right: 0px;
  background-color: rgb(185, 32, 5);
}
.operating0 span:last-of-type:hover {
  background-color: rgb(151, 29, 8);
}
.operating0 span {
  border: 1px solid #edcdcd;
  padding: 5px 18px;
  cursor: pointer;
  transition: all 200ms;
  background-color: #566969;
  color: white;
  margin-right: 12px;
}
.operating0 span:hover {
  background-color: #5d5e5e;
  transform: translateY(2px);
}
.log-info {
  max-width: 1136px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 60px;
}
.log-info .ivu-btn {
  height: 42px !important;
  line-height: 42px !important;
  padding: 0 42px !important;
  margin-top: 42px;
  float: right;
  border-radius: 0 !important;
}
.log-info >>> .tui-editor-contents {
  overflow: hidden !important;
  max-width: 680px !important;
  width: 680px !important;
  margin: auto !important;
  font-size: 16px !important;
  line-height: 30px !important;
  padding: 20px 20px 48px !important;
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
}

.log-info .tui-editor-contents-placeholder:before {
  color: #9b9e9e !important;
}
.log-info >>> .custom-video-button {
  height: 22px;
  width: 22px;
  float: left;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  background-color: #fff;
  padding: 3px;
  border-radius: 0;
  margin: 5px 3px;
  border: 1px solid #fff;
  overflow: hidden;
}
.log-title {
  padding: 24px 60px;
  text-align: center;
}
.log-title input {
  padding: 9px 36px;
  text-align: center;
  font-size: 18px;
  line-height: 24px;
  width: 80%;
}
</style>
<style lang="scss" scoped>
.an-info {
  max-width: 736px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 60px;
  &-content {
    width: 100%;
    border: 1px solid #decdcd;
    margin-bottom: 24px;
    .quz-content {
      padding: 18px;
      width: 100%;
      cursor: pointer;
      font-size: 14px;
      line-height: 24px;
      color: #282828;
    }
    .an-content {
      padding: 0 36px 18px;
      textarea {
        line-height: 24px;
        padding: 18px;
        font-size: 16px;
        width: 100%;
        resize: none;
        & ::placeholder {
          color: #656969 !important;
        }
      }
      & > div:last-of-type {
        display: flex;
        flex-direction: row-reverse;
        span {
          display: block;
          border: 1px solid #decdcd;
          padding: 6px 24px;
          background-color: #282828;
          color: white;
          margin-top: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
.none-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.ivu-tabs-tabpane {
  padding: 15px;
}
</style>
