<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-04-02 15:53:56
 * @LastEditTime: 2020-04-03 01:12:08
 * @FilePath: \indidea-frontend\src\views\More\More.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="post-main">
      <div class="send-part">
        <textarea name="post" id="post" rows="4" v-model="post"></textarea>
        <MutipartUpload ref="upload" @imagesList="getImages"></MutipartUpload>
        <Button type="success" @click="sendPost">发送</Button>
      </div>
      <div class="list-part">
        <div class="list-part-title">
          <h3>发现</h3>
          <Select
            @on-change="change($event)"
            v-model="status"
            style="width:200px"
          >
            <Option
              v-for="item in postCategoryList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
        <List v-if="reload_show" item-layout="vertical" :split="false">
          <ListItem v-for="(item, index) in postList" :key="index">
            <ListItemMeta
              :avatar="
                item.avatar
                  ? '/api/uploads/' + item.avatar
                  : require('../../assets/default.png')
              "
              :title="item.username"
              :description="createdDate(item.createdat)"
            />
            {{ item.content }}
            <template slot="action">
              <li class="post-action">
                <div @click="like_post(item.id)">
                  <Icon
                    :type="
                      'ios-thumbs-up' +
                        (item.like_check !== 1 ? '-outline' : '')
                    "
                  />
                  {{ item.like_count }}
                </div>
                <div @click="show_comment(item.id, index)">
                  <Icon type="ios-chatbubbles" /> {{ item.comment_count }}
                </div>
                <div
                  style="color:red;"
                  v-if="status === 2"
                  @click="delete_post(item.id, index)"
                >
                  <Icon type="ios-trash" /> 删除
                </div>
              </li>
              <li v-if="show_line === index" class="comment-list">
                <div class="do-comment">
                  <textarea
                    v-model="comment"
                    name="comment"
                    id="comment"
                    rows="3"
                  ></textarea>
                  <div @click="doComment(item.id)">评论</div>
                </div>
                <div
                  class="comment"
                  v-for="(item, index) in comment_list"
                  :key="index"
                >
                  <p class="comment-username">{{ item.user.username }}：</p>
                  <span class="comment-content">{{ item.comment }}</span>
                  <p class="comment-date">
                    {{ createdDate(item.createdat) }}
                  </p>
                </div>
              </li>
              <li
                v-if="show_line === index && comment_loading"
                class="comment-loading"
              >
                <Spin fix v-if="comment_loading"></Spin>
              </li>
            </template>
            <template v-if="item.cover" slot="extra">
              <template v-if="imageList(item.cover).length == 1">
                <img
                  src="../../assets/default.png"
                  alt="..a1"
                  v-real-img="imageList(item.cover)[0]"
                  style="width:185px;height:180px;"
                  @click="show_img(imageList(item.cover)[0])"
                />
              </template>
              <template v-else>
                <img
                  v-for="(item, index) in imageList(item.cover)"
                  :key="index"
                  @click="show_img(item)"
                  src="../../assets/default.png"
                  v-real-img="item"
                />
              </template>
            </template>
          </ListItem>
        </List>
        <div class="load-more">
          <span @click="loading_more" v-if="!loading">
            {{ 0 === postList.length ? "没有数据" : "加载更多" }}
          </span>
          <img v-else src="../../assets/loading2.gif" alt="loading" />
        </div>
      </div>
    </div>
    <Modal v-model="img_show" title="预览">
      <img
        src="../../assets/default.png"
        alt="...a1"
        style="width:100%"
        v-real-img="preview_img"
      />
    </Modal>
    <Footer></Footer>
  </div>
</template>
<script>
import MutipartUpload from "../../components/MutiUpload/MutipartUpload";
import PostList from "../../components/PostList/PostList";
import Footer from "../../components/Footer/Footer";
import {
  postList,
  doLike,
  commentByPostId,
  doComment,
  // eslint-disable-next-line no-unused-vars
  doPost,
  deletePost
} from "../../services/api/post";

export default {
  name: "More",
  data() {
    return {
      status: 0,
      page: 1,
      pageSize: 10,
      postList: [],
      comment_show: false,
      comment_list: [],
      comment_loading: false,
      show_line: -1,
      comment: "",
      img_show: false,
      preview_img: "",
      post: "",
      images: "",
      postCategoryList: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "我喜欢的"
        },
        {
          value: 2,
          label: "我发表的"
        }
      ],
      loading: false,
      reload_show: true
    };
  },
  components: {
    MutipartUpload,
    // eslint-disable-next-line vue/no-unused-components
    PostList,
    Footer
  },
  methods: {
    getImages(list) {
      this.images = "";
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (index === list.length - 1) {
          this.images += element;
        } else {
          this.images += element + ",";
        }
      }
    },
    getList() {
      this.reload();
      postList(this.status, this.page, this.pageSize).then(res => {
        if (res.data) {
          this.postList = res.data;
        }
      });
    },
    init() {
      this.getList();
    },
    imageList(imgs) {
      let array = imgs.split(",");
      return array;
    },
    createdDate(d) {
      let date = new Date(d);
      return date.toLocaleString().replace(/\//g, "-");
    },
    like_post(id) {
      doLike(id).then(res => {
        if (res.data) {
          this.getList();
        }
      });
    },
    show_comment(id, index) {
      if (index === this.show_line) {
        this.show_line = null;
        return;
      } else {
        this.show_line = null;
        this.comment_list = [];
        this.comment_show = true;
        this.comment_loading = true;
        commentByPostId(id).then(res => {
          if (res.data) {
            this.show_line = index;
            this.comment_loading = false;
            this.comment_list = res.data;
          }
        });
      }
    },
    doComment(id) {
      doComment(id, this.comment).then(res => {
        if (res.data) {
          this.comment = "";
          commentByPostId(id).then(res => {
            this.comment_list = res.data;
          });
        }
      });
    },
    show_img(cover) {
      this.preview_img = cover;
      this.img_show = true;
    },
    sendPost() {
      this.$nextTick(() => {
        this.$refs.upload.clearAll();
      });
      // if (this.post != "" && this.post != null) {
      //   doPost(this.post, this.images).then(res => {
      //     if (res.data) {
      //       this.post = "";
      //       this.getList();
      //     }
      //   });
      // } else {
      //   this.$Notice.warning({
      //     title: "请填写内容!"
      //   });
      // }
    },
    change(value) {
      this.status = value;
      this.getList();
    },
    loading_more() {
      if (0 === this.postList.length) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          postList(this.status, this.page, this.pageSize).then(res => {
            if (res.data.length !== 0) {
              this.postList = this.postList.concat(res.data);
            } else {
              this.$Message.info("没有了");
              this.page--;
            }
          });
          this.loading = false;
        }, 1000);
      }
    },
    reload() {
      this.reload_show = false;
      this.loading = true;
      setTimeout(() => {
        this.reload_show = true;
        this.loading = false;
      }, 500);
    },
    delete_post(id) {
      this.$Modal.confirm({
        title: "确认删除？",
        onOk: () => {
          deletePost(id).then(res => {
            if (res.data) {
              this.$Message.success("删除成功");
              this.getList();
            }
          });
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.post-main {
  max-width: 1137px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 60px;
}
.list-part {
  padding: 0 60px 60px;
  margin-top: 60px;
  .ivu-list-item {
    margin-bottom: 18px;
    padding: 15px;
    border: 1px solid #dcdcdc;
    box-shadow: 0 1px 3px rgba($color: #000000, $alpha: 0.17);
    // display: flex;
  }
  /deep/.ivu-list-item-extra {
    cursor: pointer;
    max-width: 185px;
    img {
      width: 90px;
      height: 90px;
      margin-left: 1px;
      border: 1px solid #ddd;
      object-fit: cover;
      vertical-align: middle;
      font-size: 100%;
      margin-bottom: 1px;
    }
  }
  &-title {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    h3 {
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
      position: relative;
      padding-left: 12px;
      width: 50%;
      flex: 1;
      &::before {
        position: absolute;
        height: 100%;
        width: 3px;
        left: -3px;
        background-color: rgb(0, 121, 101);
        content: "";
      }
    }
    .ivu-select {
      width: 50%;
    }
  }
}
.comment {
  border-bottom: 1px solid #ddd;
  padding: 5px;
  margin-top: 18px;
}
.comment-username {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
}
.comment-content {
  display: block;
  text-indent: 2em;
  line-height: 24px;
}
.comment-date {
  text-align: right;
  font-size: 12px;
  color: #656969;
}
.post-action {
  width: 100%;
  &::after {
    width: 0;
  }
  div {
    float: left;
    margin-right: 12px;
  }
}
.comment-list {
  text-align: left !important;
  color: #282828;
  width: 100%;
}
.do-comment {
  width: 100%;
  padding: 20px 5px;
  textarea {
    width: 100%;
    resize: none;
    padding: 5px;
    font-size: 14px;
    line-height: 24px;
  }
  div {
    border: 1px solid #ddd;
    line-height: 24px;
    padding: 5px 20px;
    background-color: #282828;
    color: white;
    display: inline-block;
    // float: right;
    margin-top: 5px;
  }
}
.comment-loading {
  height: 240px;
  width: 100%;
}
.send-part {
  padding: 60px 60px 0;
  textarea {
    width: 100%;
    padding: 18px 9px;
    line-height: 24px;
    font-size: 16px;
    resize: none;
    border-color: #ddd;
  }
  div {
    &:last-of-type {
      margin: 12px 0 12px;
    }
  }
}
.load-more {
  margin-top: 24px;
  width: 100%;
  text-align: center;
  padding: 6px;
  padding: 12px;
  span {
    cursor: pointer;
    line-height: 24px;
    display: inline-block;
    &:hover {
      text-decoration: underline #282828;
    }
  }
  img {
    height: 24px;
  }
}
</style>
