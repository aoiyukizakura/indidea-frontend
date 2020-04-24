<!--
 * @Author: Morpho Sylvie
 * @Date: 2020-04-02 15:53:56
 * @LastEditTime: 2020-04-24 15:30:53
 * @FilePath: \indidea-frontend\src\views\More\index.vue
 * @Description: 
 -->
<template>
  <div>
    <div class="post-main">
      <div class="send-part">
        <textarea name="post" id="post" rows="4" v-model="post"></textarea>
        <Row class="send-part-bottom" type="flex">
          <i-col class="the-dark-sider">
            <MutipartUpload
              ref="upload"
              @imagesList="getImages"
            ></MutipartUpload>
            <Button type="success" @click="sendPost">发送</Button>
          </i-col>
          <i-col class="the-chosen-one">
            <Select
              @on-change="projectChange($event)"
              v-model="project_id"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading1"
              style="width:300px"
              size="large"
              placeholder="可选择一个话题项目"
              clearable
            >
              <Option
                v-for="item in projectList"
                :value="item.id"
                :key="item.id"
                >{{ item.title }}</Option
              >
            </Select>
          </i-col>
        </Row>
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
            <div
              @click="toDetail(item.project_id)"
              class="bring-topic"
              v-if="item.project_id"
            >
              #{{ item.project_title }}#
            </div>
            <br v-if="item.project_id" />
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
                <template v-if="comment_list.length">
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
                </template>
                <template v-else>
                  <div>暂无评论</div>
                </template>
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
        <div v-if="loading" class="load-fill"></div>
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
import "../../assets/scss/post-more.scss";
import MutipartUpload from "../../components/MutiUpload/index";
import PostList from "../../components/PostList/index";
import Footer from "../../components/Footer/index";
import {
  postList,
  doLike,
  commentByPostId,
  doComment,
  // eslint-disable-next-line no-unused-vars
  doPost,
  deletePost
} from "../../services/api/post";
import { searchProject } from "../../services/api/project";

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
      project_id: null,
      projectList: [],
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
      loading1: false,
      reload_show: true,
      query: {
        keyword: "",
        sort: 0,
        categoryId: 0,
        status: 1,
        page: 0
      }
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
      if (this.post != "" && this.post != null) {
        if (!this.project_id) {
          doPost(this.post, this.images).then(res => {
            if (res.data) {
              this.post = "";
              this.project_id = null;
              this.reload();
              this.getList();
            }
          });
        } else {
          doPost(this.post, this.images, this.project_id).then(res => {
            if (res.data) {
              this.post = "";
              this.project_id = null;
              this.reload();
              this.getList();
            }
          });
        }
      } else {
        this.$Notice.warning({
          title: "请填写内容!"
        });
      }
    },
    projectChange(value) {
      this.project_id = value;
    },
    change(value) {
      this.status = value;
      this.reload();
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
      }, 1000);
    },
    delete_post(id) {
      this.$Modal.confirm({
        title: "确认删除？",
        onOk: () => {
          deletePost(id).then(res => {
            if (res.data) {
              this.$Message.success("删除成功");
              this.reload();
              this.getList();
            }
          });
        }
      });
    },
    remoteMethod(q) {
      if (q !== "") {
        this.loading1 = true;
        this.query.keyword = q;
        setTimeout(() => {
          this.loading1 = false;
          searchProject(this.query).then(res => {
            this.projectList = res.data.list;
          });
        }, 500);
      } else {
        this.projectList = [];
      }
    },
    toDetail(id) {
      this.$router.push(`/project-detail/${id}`);
    }
  },
  created() {
    this.init();
  }
};
</script>
