<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-03-13 13:57:02
 * @LastEditTime: 2020-03-30 14:05:40
 * @FilePath: \indidea-frontend\src\views\editdetail\Story.vue
 * @Description: 
 -->
<template>
  <div>
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
      <div class="story-info-content">
        <div class="story-info-container">
          <div>
            <Row class="story-row">
              <i-col>
                <h2>创意故事</h2>
                <div class="des-content">
                  <div>
                    <span>
                      描述一下你的这个创意是什么，它是出于什么样的巧合和你相遇的，你为什么对这个创意有这样的信心或者是它有什么特别的地方。
                      你将要计划怎么去实现这个创意，告诉支持者们你是谁也很重要。
                      根据你的描述，支持者他们应该会得到自己想要知道的东西。
                      你甚至还可以透过图片视频来展现这个方案以及他们将要得到的回报是什么样的。
                    </span>
                  </div>
                </div>
              </i-col>
              <i-col>
                <div id="editSection"></div>
                <input
                  type="file"
                  @change="upload($event, 0)"
                  ref="storyImg"
                  accept="image/*"
                  hidden
                />
                <input
                  type="file"
                  @change="upload(e, 1)"
                  ref="storyVideo"
                  accept="video/*"
                  hidden
                />
                <Button @click="saveStory" type="success">保存</Button>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import "codemirror/lib/codemirror.css"; // codemirror
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content
// import "../../assets/css/project/storyInfo.scss";
// eslint-disable-next-line no-unused-vars
import {
  uploadFile,
  // eslint-disable-next-line no-unused-vars
  updateProject,
  getProjectByFlagById
} from "../../services/api";
const Editer = require("tui-editor");

export default {
  name: "story",
  data() {
    return {
      editor: null,
      storyData: ""
    };
  },
  methods: {
    getStory() {
      getProjectByFlagById({
        projectId: this.$route.params.projectId,
        flag: 0
      }).then(res => {
        if (res.data) {
          this.editor.setValue(res.data.story);
        }
      });
    },
    initEditor() {
      this.editor = new Editer({
        el: document.querySelector("#editSection"),
        height: "auto",
        minHeight: "480px",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        usageStatistics: false,
        initialValue: this.storyData,
        hideModeSwitch: false,
        placeholder: "用一种较为轻松的语气来写作，可以不用那么严肃...",
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
      let videoDom = this.$refs.storyVideo;
      this.editor.eventManager.addEventType("uploadImg");
      this.editor.eventManager.addEventType("uploadVideo");
      this.editor.eventManager.listen("uploadImg", () => {
        imgDom.click();
      });
      this.editor.eventManager.listen("uploadVideo", () => {
        videoDom.click();
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
      toolbar.addButton({
        name: "uploadVideo",
        className: "upload-video",
        event: "uploadVideo",
        tooltip: "插入一段影片",
        $el: $(
          `<i class="custom-video-button ivu-icon ivu-icon-md-videocam"></i>`
        )
      });
    },
    destroyEditor() {
      if (!this.editor) return;
      this.editor.off("change");
      this.editor.remove();
    },
    /**
     * @param flag 0上传图片, 1上传视频
     */
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
        } else if (flag === 1) {
          // 上传视频
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
    saveStory() {
      let story = this.editor.getValue();
      let data = {};
      data["story"] = story;
      data["id"] = this.$route.params.projectId;
      console.log("data :", data);
      updateProject(data).then(res => {
        if (res.data) {
          this.$Message.success("保存成功！");
        }
      });
    }
  },
  computed: {},
  created() {
    this.getStory();
  },
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.destroyEditor();
  }
};
</script>

<style lang="css" scoped>
.story-info .story-info-content {
  border-top: 1px solid #dcdedd;
}
.story-info .story-info-content .story-info-container {
  max-width: 1366px;
  padding-right: 60px;
  padding-left: 60px;
  margin-right: auto;
  margin-left: auto;
}
.story-info .story-info-content .story-info-container .story-row {
  padding: 48px 0;
}
.story-info .story-info-content .story-info-container .story-row .ivu-col {
  padding: 0 18px;
}
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:first-of-type
  h2 {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #282828;
}
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:first-of-type
  .des-content {
  margin-top: 6px;
  color: #656969;
  font-size: 14px;
  line-height: 24px;
}
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:first-of-type
  .des-content
  div {
  width: 50%;
  margin-bottom: 12px;
}
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:last-of-type {
  margin-top: 18px;
}
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:last-of-type
  .ivu-btn {
  height: 42px !important;
  line-height: 42px !important;
  padding: 0 42px !important;
  margin-top: 42px;
  float: right;
  border-radius: 0 !important;
}
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:last-of-type
  >>> .tui-editor-contents {
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
.story-info
  .story-info-content
  .story-info-container
  .story-row
  .ivu-col:last-of-type
  .tui-editor-contents-placeholder:before {
  color: #9b9e9e !important;
}
.story-info >>> .custom-video-button {
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
</style>
